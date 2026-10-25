<?php

use App\Mail\ContactInquiryNotification;
use App\Models\ContactInquiry;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    Mail::fake();
    Http::preventStrayRequests();
    Http::fake();
    $this->withoutVite();
});

function luxuriaLeadPayload(array $overrides = []): array
{
    return [
        'request_type' => 'investor',
        'first_name' => 'Sara',
        'last_name' => 'Alharbi',
        'phone' => '0512345678',
        'email' => 'sara@example.com',
        'message' => 'I would like to discuss property opportunities.',
        'consent' => true,
        ...$overrides,
    ];
}

it('stores each type locally pending approval even when Hub is enabled', function (string $type) {
    config(['services.sniperhub.intake_enabled' => true, 'services.sniperhub.intake_key' => 'fake-test-key']);

    $this->from('/contact')->post('/contact-inquiries', luxuriaLeadPayload([
        'request_type' => $type,
        'hub_uid' => 'FORGED',
        'promoted_by' => 123,
    ]))->assertRedirect('/contact')->assertSessionHasNoErrors()->assertSessionHas('success');

    $lead = ContactInquiry::sole();
    expect($lead->request_type)->toBe($type)
        ->and($lead->phone)->toBe('+966512345678')
        ->and($lead->last_name)->toBe('Alharbi')
        ->and($lead->consented_at)->not->toBeNull()
        ->and($lead->hub_uid)->toBeNull()
        ->and($lead->promoted_at)->toBeNull()
        ->and($lead->promoted_by)->toBeNull()
        ->and($lead->promotionStatus())->toBe('Pending approval');
    Mail::assertQueued(ContactInquiryNotification::class, 1);
    Http::assertNothingSent();
})->with(['broker', 'investor', 'project_owner', 'other']);

it('rejects missing or invalid required lead details without saving or sending', function (array $overrides, string $error) {
    $this->post('/contact-inquiries', luxuriaLeadPayload($overrides))->assertSessionHasErrors($error);
    $this->assertDatabaseCount('contact_inquiries', 0);
    Mail::assertNothingQueued();
    Http::assertNothingSent();
})->with([
    [['request_type' => 'buy'], 'request_type'],
    [['request_type' => null], 'request_type'],
    [['phone' => null], 'phone'],
    [['phone' => '0112345678'], 'phone'],
    [['first_name' => ''], 'first_name'],
    [['last_name' => ''], 'last_name'],
    [['email' => 'invalid'], 'email'],
    [['message' => ''], 'message'],
    [['consent' => false], 'consent'],
]);

it('keeps distinct submissions with the same email separate, matching Sniper contact behavior', function () {
    $this->post('/contact-inquiries', luxuriaLeadPayload())->assertSessionHasNoErrors();
    $this->post('/contact-inquiries', luxuriaLeadPayload())->assertSessionHasNoErrors();
    $this->assertDatabaseCount('contact_inquiries', 2);
    Http::assertNothingSent();
});

it('preserves Arabic validation, submission locale and the success prop', function () {
    $this->withSession(['locale' => 'ar'])->post('/contact-inquiries', luxuriaLeadPayload(['phone' => '']))
        ->assertSessionHasErrors(['phone' => 'يرجى إدخال رقم الهاتف.']);
    $this->withSession(['locale' => 'ar'])->from('/contact')->post('/contact-inquiries', luxuriaLeadPayload())
        ->assertSessionHasNoErrors();
    expect(ContactInquiry::sole()->locale)->toBe('ar');
    $this->get('/contact')->assertInertia(fn (Assert $page) => $page->component('Contact')->where('success', __('pages.contact_lead_success', [], 'ar')));
});

it('renders the lead label and full name in the existing admin notification', function () {
    $lead = ContactInquiry::factory()->create(['request_type' => 'project_owner', 'first_name' => 'Sara', 'last_name' => 'Alharbi']);
    $mail = new ContactInquiryNotification($lead);
    expect($mail->envelope()->subject)->toBe('New Luxuria Lead - Project owner');
    expect($mail->render())->toContain('Sara Alharbi', 'Project owner', '/edit');
});

it('serves the updated single public email, phone and address in both locales', function (string $locale, string $address) {
    $this->withSession(['locale' => $locale])->get('/contact')->assertInertia(fn (Assert $page) => $page
        ->component('Contact')
        ->where('translations.pages.email_info', 'info@luxuria.com.sa')
        ->where('translations.pages.phone_number_1', '+966 50 342 2777')
        ->where('translations.pages.address_line_1', 'Olaya view')
        ->where('translations.pages.address_line_2', $address)
        ->missing('translations.pages.email_sales')
        ->missing('translations.pages.phone_number_2'));
})->with([['en', 'King Fahd Road, Riyadh'], ['ar', 'طريق الملك فهد، الرياض']]);

it('displays the updated contacts despite cached database overrides without changing stored content', function (string $locale) {
    \App\Models\Translation::create(['group' => 'pages', 'key' => 'email_info', 'locale' => $locale, 'value' => 'info@luxuria.sa']);
    \Illuminate\Support\Facades\Cache::put('translations.'.$locale.'.pages', [
        'email_info' => 'info@luxuria.sa', 'phone_number_1' => '+966 11 234 5678',
        'address_line_1' => 'Old address', 'address_line_2' => 'Old city',
        'email_sales' => 'sales@luxuria.sa', 'phone_number_2' => '+966 50 123 4567',
    ]);
    $faq = \App\Models\Faq::factory()->create([
        'answer' => 'Contact broker@luxuria.sa or 0503422777 / 0580037374.',
        'answer_ar' => 'تواصل عبر broker@luxuria.sa أو 0503422777 / 0580037374.',
        'is_active' => true,
    ]);
    $this->withSession(['locale' => $locale])->get('/contact')->assertInertia(fn (Assert $page) => $page
        ->where('translations.pages.email_info', 'info@luxuria.com.sa')
        ->where('translations.pages.phone_number_1', '+966 50 342 2777')
        ->where('translations.pages.address_line_1', 'Olaya view')
        ->missing('translations.pages.email_sales')
        ->missing('translations.pages.phone_number_2')
        ->where('faqs.0.answer', fn (string $answer): bool => str_contains($answer, 'info@luxuria.com.sa') && str_contains($answer, '+966 50 342 2777') && ! str_contains($answer, 'broker@luxuria.sa')));
    expect($faq->fresh()->answer)->toBe('Contact broker@luxuria.sa or 0503422777 / 0580037374.');
    expect(\App\Models\Translation::sole()->value)->toBe('info@luxuria.sa');
})->with(['en', 'ar']);
