<?php

use App\Filament\Resources\ContactInquiries\Pages\EditContactInquiry;
use App\Filament\Resources\ContactInquiries\Pages\ListContactInquiries;
use App\Models\ContactInquiry;
use App\Models\User;
use Filament\Actions\Testing\TestAction;
use Filament\Facades\Filament;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Livewire\Livewire;

beforeEach(function () {
    Mail::fake();
    Http::preventStrayRequests();
    $this->approver = User::factory()->create();
    $this->actingAs($this->approver);
    Filament::setCurrentPanel(Filament::getPanel('admin'));
    config([
        'contact-leads.approver_ids' => [$this->approver->id],
        'services.sniperhub.intake_enabled' => true,
        'services.sniperhub.intake_key' => 'fake-test-key',
        'services.sniperhub.leads_url' => 'https://hub.test/intake/v1/leads',
    ]);
});

it('shows new and legacy lead details and keeps promotion hidden for unauthorized users', function () {
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    $legacy = ContactInquiry::factory()->legacy()->create();
    config(['contact-leads.approver_ids' => []]);
    Livewire::test(ListContactInquiries::class)->assertCanSeeTableRecords([$lead, $legacy])
        ->assertActionHidden(TestAction::make('promote')->table($lead));
    Http::assertNothingSent();
});

it('mounts confirmation without sending, then promotes only when confirmed', function () {
    Http::fake(['hub.test/*' => Http::response(['data' => ['uid' => 'SNIPER-ADMIN']], 201)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'investor']);
    $page = Livewire::test(ListContactInquiries::class)->mountAction(TestAction::make('promote')->table($lead))->assertActionMounted(TestAction::make('promote')->table($lead));
    Http::assertNothingSent();
    expect($lead->fresh()->hub_uid)->toBeNull();
    $page->callMountedAction()->assertNotified();
    expect($lead->fresh()->hub_uid)->toBe('SNIPER-ADMIN')->and($lead->fresh()->promoted_by)->toBe($this->approver->id);
    Http::assertSentCount(1);
});

it('hides completed and legacy promotions and disables Other and a disabled connection', function () {
    $promoted = ContactInquiry::factory()->promoted()->create();
    $legacy = ContactInquiry::factory()->legacy()->create();
    $other = ContactInquiry::factory()->create(['request_type' => 'other']);
    $broker = ContactInquiry::factory()->create(['request_type' => 'broker']);
    Livewire::test(ListContactInquiries::class)
        ->assertActionHidden(TestAction::make('promote')->table($promoted))
        ->assertActionHidden(TestAction::make('promote')->table($legacy))
        ->assertActionDisabled(TestAction::make('promote')->table($other));
    config(['services.sniperhub.intake_enabled' => false]);
    Livewire::test(ListContactInquiries::class)->assertActionDisabled(TestAction::make('promote')->table($broker));
    Http::assertNothingSent();
});

it('promotes from the record page and displays its Hub reference and approver', function () {
    Http::fake(['hub.test/*' => Http::response(['data' => ['uid' => 'SNIPER-RECORD']], 201)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    Livewire::test(EditContactInquiry::class, ['record' => $lead->id])->callAction('promote')->assertNotified();
    Livewire::test(EditContactInquiry::class, ['record' => $lead->id])->assertFormSet(['hub_uid' => 'SNIPER-RECORD', 'promoted_by_name' => $this->approver->name]);
});

it('reports uncertain receipt without claiming nothing was sent', function () {
    Http::fake(['hub.test/*' => Http::response([], 503)]);
    $lead = ContactInquiry::factory()->create(['request_type' => 'broker']);
    Livewire::test(ListContactInquiries::class)->callAction(TestAction::make('promote')->table($lead))
        ->assertNotified(Notification::make()->danger()->persistent()->title('Lead remains pending')
            ->body('Sniper Hub did not confirm receipt. Retry this same lead; its idempotency key is preserved.'));
    expect($lead->fresh()->hub_uid)->toBeNull();
});
