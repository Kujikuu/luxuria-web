<?php

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    config()->set('services.blog.url', 'https://blog.test');
    config()->set('services.blog.api_key', 'luxuria-api-key');
});

it('renders blog posts from the external blog api', function () {
    fakeBlogIndex();

    $this->get('/blog?search=market&category=luxury')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Blog/Index')
            ->where('blogs.data.0.title', 'Luxury Market Outlook')
            ->where('blogs.data.0.about', 'Market insight excerpt.')
            ->where('blogs.data.0.publish_date', '2026-04-20T10:00:00.000000Z')
            ->where('categories.0.slug', 'luxury')
            ->where('filters.search', 'market')
            ->where('filters.category', 'luxury')
            ->etc());

    Http::assertSent(function (HttpRequest $request): bool {
        parse_str(parse_url($request->url(), PHP_URL_QUERY) ?: '', $query);

        return str_starts_with($request->url(), 'https://blog.test/api/blog/posts')
            && $request->hasHeader('X-Website-Api-Key', 'luxuria-api-key')
            && ($query['locale'] ?? null) === 'en'
            && ($query['per_page'] ?? null) === '7'
            && ($query['search'] ?? null) === 'market'
            && ($query['category'] ?? null) === 'luxury';
    });
});

it('passes arabic locale to the external blog api', function () {
    fakeBlogIndex(title: 'توقعات سوق الرفاهية');

    $this->get('/ar/blog')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Blog/Index')
            ->where('blogs.data.0.title', 'توقعات سوق الرفاهية')
            ->etc());

    Http::assertSent(function (HttpRequest $request): bool {
        parse_str(parse_url($request->url(), PHP_URL_QUERY) ?: '', $query);

        return str_starts_with($request->url(), 'https://blog.test/api/blog/posts')
            && ($query['locale'] ?? null) === 'ar';
    });
});

it('renders a blog detail page from the external blog api with related posts', function () {
    fakeBlogDetail();

    $this->get('/blog/luxury-market-outlook')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Blog/Show')
            ->where('blog.title', 'Luxury Market Outlook')
            ->where('blog.has_access', true)
            ->where('blog.category.slug', 'luxury')
            ->has('relatedBlogs', 1)
            ->where('relatedBlogs.0.slug', 'luxury-design-trends')
            ->etc());
});

it('returns not found when the external blog api cannot find a post', function () {
    Http::fake([
        'blog.test/api/blog/posts/missing*' => Http::response(['message' => 'Not Found'], 404),
    ]);

    $this->get('/blog/missing')->assertNotFound();
});

it('renders gated posts without access when there is no session grant', function () {
    fakeBlogDetail(isGated: true);

    $this->get('/blog/luxury-market-outlook')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Blog/Show')
            ->where('blog.is_rv_club_only', true)
            ->where('blog.has_access', false)
            ->etc());
});

it('unlocks a gated post for existing subscribers', function () {
    NewsletterSubscriber::factory()->create([
        'email' => 'member@example.com',
    ]);

    $this->postJson('/blog/luxury-market-outlook/check-access', [
        'email' => 'member@example.com',
    ])
        ->assertOk()
        ->assertJson(['subscribed' => true])
        ->assertSessionHas('blog_access_luxury-market-outlook');
});

it('returns unsubscribed for unknown gated post access checks', function () {
    $this->postJson('/blog/luxury-market-outlook/check-access', [
        'email' => 'guest@example.com',
    ])
        ->assertOk()
        ->assertJson(['subscribed' => false]);
});

it('creates a subscriber and grants post access', function () {
    $this->postJson('/blog/luxury-market-outlook/subscribe', [
        'email' => 'new-member@example.com',
        'phone' => '+966500000000',
    ])
        ->assertCreated()
        ->assertJson(['subscribed' => true])
        ->assertSessionHas('blog_access_luxury-market-outlook');

    $this->assertDatabaseHas('newsletter_subscribers', [
        'email' => 'new-member@example.com',
        'phone' => '+966500000000',
    ]);
});

it('validates duplicate subscriber submissions', function () {
    NewsletterSubscriber::factory()->create([
        'email' => 'member@example.com',
    ]);

    $this->postJson('/blog/luxury-market-outlook/subscribe', [
        'email' => 'member@example.com',
        'phone' => '+966500000000',
    ])->assertUnprocessable()
        ->assertInvalid(['email']);
});

function fakeBlogIndex(string $title = 'Luxury Market Outlook'): void
{
    Http::fake([
        'blog.test/api/blog/posts*' => Http::response([
            'data' => [
                blogPostPayload(title: $title),
            ],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 7,
                'total' => 1,
                'from' => 1,
                'to' => 1,
            ],
        ]),
        'blog.test/api/blog/categories*' => Http::response([
            'data' => [
                ['name' => 'Luxury', 'slug' => 'luxury', 'posts_count' => 1],
            ],
        ]),
        'blog.test/api/blog/tags*' => Http::response([
            'data' => [
                ['name' => 'Design', 'slug' => 'design', 'posts_count' => 1],
            ],
        ]),
    ]);
}

function fakeBlogDetail(bool $isGated = false): void
{
    Http::fake([
        'blog.test/api/blog/posts/luxury-market-outlook*' => Http::response([
            'data' => blogPostPayload(isGated: $isGated),
        ]),
        'blog.test/api/blog/posts*category=luxury*' => Http::response([
            'data' => [
                blogPostPayload(),
                blogPostPayload(
                    id: 2,
                    title: 'Luxury Design Trends',
                    slug: 'luxury-design-trends',
                ),
            ],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 4,
                'total' => 2,
            ],
        ]),
        'blog.test/api/blog/posts*' => Http::response([
            'data' => [],
            'meta' => [
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 4,
                'total' => 0,
            ],
        ]),
    ]);
}

/**
 * @return array<string, mixed>
 */
function blogPostPayload(
    int $id = 1,
    string $title = 'Luxury Market Outlook',
    string $slug = 'luxury-market-outlook',
    bool $isGated = false,
): array {
    return [
        'id' => $id,
        'title' => $title,
        'slug' => $slug,
        'excerpt' => 'Market insight excerpt.',
        'content' => '<p>Luxury real estate market content with useful analysis.</p>',
        'featured_image' => 'https://blog.test/storage/blog/image.jpg',
        'meta_title' => $title,
        'meta_description' => 'Meta description.',
        'og_image' => null,
        'is_rv_club_only' => $isGated,
        'published_at' => '2026-04-20T10:00:00.000000Z',
        'author' => [
            'name' => 'Luxuria Editorial',
        ],
        'category' => [
            'name' => 'Luxury',
            'slug' => 'luxury',
            'posts_count' => 2,
        ],
        'tags' => [
            [
                'name' => 'Design',
                'slug' => 'design',
                'posts_count' => 1,
            ],
        ],
    ];
}
