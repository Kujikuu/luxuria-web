<?php

use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config()->set('services.dealio.api_url', 'https://dealio.test');
    config()->set('services.dealio.api_token', 'test-token');
});

it('renders the Dealio listing page', function () {
    $this->get('/dealio')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dealio/Index')
            ->where('translations.pages.dealio_header', __('pages.dealio_header'))
            ->where('translations.components.dealio_listing_error', __('components.dealio_listing_error')));
});

it('renders the localized Dealio listing page', function () {
    $this->get('/ar/dealio')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Dealio/Index'));
});

it('renders the Dealio detail page with the slug prop', function () {
    $this->get('/dealio/riyadh-villas')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dealio/Show')
            ->where('slug', 'riyadh-villas'));
});

it('renders the localized Dealio detail page with the slug prop', function () {
    $this->get('/ar/dealio/riyadh-villas')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dealio/Show')
            ->where('slug', 'riyadh-villas'));
});

it('always scopes opportunity listing requests to real estate', function () {
    Http::fake([
        'dealio.test/api/v1/opportunities*' => Http::response([
            'data' => [],
            'meta' => ['current_page' => 1, 'last_page' => 1],
        ]),
    ]);

    $this->getJson('/api/dealio/opportunities?industry[]=saas&type=equity')
        ->assertOk();

    Http::assertSent(function (HttpRequest $request): bool {
        parse_str(parse_url($request->url(), PHP_URL_QUERY) ?: '', $query);

        return $request->url() === 'https://dealio.test/api/v1/opportunities?type=equity&industry%5B0%5D=real-estate'
            || (($query['industry'][0] ?? null) === 'real-estate' && ($query['type'] ?? null) === 'equity');
    });
});

it('does not expose non real estate opportunity details', function () {
    Http::fake([
        'dealio.test/api/v1/opportunities/coffee-franchise' => Http::response([
            'data' => [
                'slug' => 'coffee-franchise',
                'title' => 'Coffee Franchise',
                'industry' => ['slug' => 'hospitality'],
            ],
        ]),
    ]);

    $this->getJson('/api/dealio/opportunities/coffee-franchise')
        ->assertNotFound();
});

it('forwards valid lead submissions to Dealio', function () {
    Http::fake([
        'dealio.test/api/v1/leads' => Http::response(['message' => 'Created'], 201),
    ]);

    $this->postJson('/api/dealio/leads', [
        'opportunity_uuid' => 'opp-123',
        'name' => 'Sara Investor',
        'email' => 'sara@example.com',
        'phone' => '+966500000000',
        'investment_amount' => 500000,
        'message' => 'Interested in details.',
    ])->assertCreated();

    Http::assertSent(fn (HttpRequest $request): bool => $request->url() === 'https://dealio.test/api/v1/leads'
        && $request['opportunity_uuid'] === 'opp-123'
        && $request['name'] === 'Sara Investor');
});

it('validates lead submissions before forwarding to Dealio', function () {
    Http::fake();

    $this->postJson('/api/dealio/leads', [
        'name' => '',
        'email' => 'not-an-email',
    ])->assertUnprocessable();

    Http::assertNothingSent();
});
