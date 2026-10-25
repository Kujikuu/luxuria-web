<?php

use App\Models\ContactInquiry;
use App\Models\User;
use App\Services\PromoteContactLead;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

beforeEach(function () {
    Mail::fake();
    Http::preventStrayRequests();
    $this->approver = User::factory()->create();
    config([
        'contact-leads.approver_ids' => [$this->approver->id],
        'services.sniperhub.intake_enabled' => true,
        'services.sniperhub.intake_key' => 'fake-test-key',
        'services.sniperhub.intake_url' => 'https://hub.test/intake/v1/applications',
        'services.sniperhub.leads_url' => 'https://hub.test/intake/v1/leads',
        'app.url' => 'https://luxuria.test',
    ]);
});

it('promotes an explicitly approved lead to the correct endpoint and records its approver', function (string $type, string $target) {
    Http::fake(['hub.test/*' => Http::response(['data' => ['uid' => 'SNIPER-TEST123']], 201)]);
    $lead = ContactInquiry::factory()->create(['request_type' => $type, 'locale' => 'ar']);

    app(PromoteContactLead::class)->handle($lead, $this->approver);

    expect($lead->fresh()->hub_uid)->toBe('SNIPER-TEST123')
        ->and($lead->fresh()->hub_target)->toBe($target)
        ->and($lead->fresh()->promoted_by)->toBe($this->approver->id)
        ->and($lead->fresh()->promoted_at)->not->toBeNull()
        ->and($lead->fresh()->promotionStatus())->toBe('Promoted');
    Http::assertSent(fn (Request $request): bool => $request->url() === ($target === 'application' ? 'https://hub.test/intake/v1/applications' : 'https://hub.test/intake/v1/leads')
        && $request->hasHeader('Idempotency-Key', 'luxuria-contact-inquiry-'.$lead->id)
        && $request->hasHeader('Authorization', 'Bearer fake-test-key')
        && $request['first_name'] === $lead->first_name
        && $request['last_name'] === $lead->last_name
        && $request['phone'] === $lead->phone
        && $request['email'] === $lead->email
        && $request['consent'] === true
        && $request['locale'] === 'ar'
        && $request['source_site'] === 'https://luxuria.test'
        && $request['utm'] === ['source' => 'luxuria_contact']
        && ($target === 'application'
            ? $request['description'] === $lead->message && $request['extra'][0]['value'] === 'صاحب مشروع' && ! isset($request['track'])
            : $request['track'] === $type && $request['message'] === $lead->message));
    Http::assertSentCount(1);
    Mail::assertNothingSent();
    Mail::assertNothingQueued();
})->with([['broker', 'lead'], ['investor', 'lead'], ['project_owner', 'application']]);

it('denies promotion to an authenticated user outside the allowlist', function () {
    Http::fake();
    config(['contact-leads.approver_ids' => []]);
    $lead = ContactInquiry::factory()->create();
    expect(fn () => app(PromoteContactLead::class)->handle($lead, $this->approver))->toThrow(AuthorizationException::class);
    Http::assertNothingSent();
});

it('blocks legacy records, missing consent, incomplete names and Other without sending', function (array $attributes) {
    Http::fake();
    $lead = ContactInquiry::factory()->create($attributes);
    expect(fn () => app(PromoteContactLead::class)->handle($lead, $this->approver))->toThrow(DomainException::class);
    Http::assertNothingSent();
    expect($lead->fresh()->hub_uid)->toBeNull();
})->with([
    [['request_type' => 'buy', 'last_name' => null, 'consented_at' => null]],
    [['request_type' => 'broker', 'consented_at' => null]],
    [['request_type' => 'broker', 'last_name' => null]],
    [['request_type' => 'other']],
]);

it('never sends when the connection is disabled or the endpoint is missing or insecure', function (array $settings) {
    Http::fake();
    config($settings);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    expect(fn () => app(PromoteContactLead::class)->handle($lead, $this->approver))->toThrow(DomainException::class);
    Http::assertNothingSent();
})->with([
    [['services.sniperhub.intake_enabled' => false]],
    [['services.sniperhub.intake_key' => null]],
    [['services.sniperhub.leads_url' => null]],
    [['services.sniperhub.leads_url' => 'http://hub.test/intake/v1/leads']],
]);

it('does not send a promoted record twice', function () {
    Http::fake(['hub.test/*' => Http::response(['data' => ['uid' => 'SNIPER-ONCE']], 201)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    $service = app(PromoteContactLead::class);
    expect($service->handle($lead, $this->approver))->toBe('SNIPER-ONCE');
    expect($service->handle($lead->fresh(), $this->approver))->toBe('SNIPER-ONCE');
    Http::assertSentCount(1);
});

it('preserves Hub field errors and leaves the local lead pending', function () {
    Http::fake(['hub.test/*' => Http::response(['errors' => ['phone' => ['Phone refused.']]], 422)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'investor']);
    try {
        app(PromoteContactLead::class)->handle($lead, $this->approver);
        $this->fail('Expected Hub field validation.');
    } catch (ValidationException $exception) {
        expect($exception->errors())->toBe(['phone' => ['Phone refused.']]);
    }
    expect($lead->fresh()->hub_uid)->toBeNull()->and($lead->fresh()->promoted_by)->toBeNull();
    Http::assertSentCount(1);
});

it('reports conflict, server failure and malformed success without marking promoted', function (int $status, array $body, int $calls, int $code) {
    Http::fake(['hub.test/*' => Http::response($body, $status)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    try {
        app(PromoteContactLead::class)->handle($lead, $this->approver);
        $this->fail('Expected a Hub failure.');
    } catch (RuntimeException $exception) {
        expect($exception->getCode())->toBe($code);
    }
    expect($lead->fresh()->hub_uid)->toBeNull()->and($lead->fresh()->promoted_at)->toBeNull();
    Http::assertSentCount($calls);
})->with([[409, ['message' => 'Conflict'], 1, 409], [503, [], 2, 0], [201, ['data' => ['uid' => '']], 1, 0]]);

it('retries transient failures using the same key and saves only the confirmed result', function () {
    Http::fake(['hub.test/*' => Http::sequence()->push([], 503)->push(['data' => ['uid' => 'SNIPER-RETRY']], 201)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    expect(app(PromoteContactLead::class)->handle($lead, $this->approver))->toBe('SNIPER-RETRY');
    Http::assertSentCount(2);
    Http::assertSent(fn (Request $request): bool => $request->hasHeader('Idempotency-Key', 'luxuria-contact-inquiry-'.$lead->id));
});

it('keeps an uncertain connection attempt pending and releases its lock for retry', function () {
    $attempts = 0;
    Http::fake(function () use (&$attempts) {
        if (++$attempts <= 2) {
            throw new ConnectionException('Simulated timeout');
        }

        return Http::response(['data' => ['uid' => 'SNIPER-AFTER-TIMEOUT']], 200);
    });
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    expect(fn () => app(PromoteContactLead::class)->handle($lead, $this->approver))->toThrow(RuntimeException::class, 'did not confirm receipt');
    expect($lead->fresh()->hub_uid)->toBeNull();
    $lock = Cache::lock('luxuria-hub-contact-'.$lead->id, 90);
    expect($lock->get())->toBeTrue();
    $lock->release();
    expect(app(PromoteContactLead::class)->handle($lead, $this->approver))->toBe('SNIPER-AFTER-TIMEOUT');
});

it('preserves historical enquiries when the reversible migration is applied', function () {
    $migration = require database_path('migrations/2026_10_25_160000_add_lead_promotion_to_contact_inquiries_table.php');
    $migration->down();
    $legacy = ContactInquiry::create(['request_type' => 'buy', 'first_name' => 'Legacy', 'email' => 'legacy@example.com', 'phone' => '0501234567', 'message' => 'Original enquiry']);
    $migration->up();
    $legacy->refresh();
    expect($legacy->request_type)->toBe('buy')->and($legacy->message)->toBe('Original enquiry')
        ->and($legacy->last_name)->toBeNull()->and($legacy->consented_at)->toBeNull()
        ->and($legacy->hub_uid)->toBeNull()->and($legacy->promotionStatus())->toBe('Legacy enquiry');
});
