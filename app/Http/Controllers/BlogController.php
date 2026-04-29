<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckBlogAccessRequest;
use App\Models\NewsletterSubscriber;
use App\Services\BlogApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
        private readonly BlogApiService $blogApi
    ) {}

    public function index(Request $request): Response
    {
        $filters = array_filter([
            'locale' => app()->getLocale(),
            'category' => $request->query('category'),
            'tag' => $request->query('tag'),
            'page' => $request->query('page'),
            'per_page' => $request->integer('per_page', 7),
            'search' => $request->query('search'),
        ], fn (mixed $value): bool => $value !== null && $value !== '');

        return Inertia::render('Blog/Index', [
            'blogs' => $this->transformPostsResponse($this->blogApi->getPosts($filters)),
            'categories' => $this->transformTaxonomiesResponse($this->blogApi->getCategories(app()->getLocale())),
            'tags' => $this->transformTaxonomiesResponse($this->blogApi->getTags(app()->getLocale())),
            'filters' => [
                'search' => $request->query('search'),
                'category' => $request->query('category'),
                'tag' => $request->query('tag'),
            ],
        ]);
    }

    public function show(Request $request): Response
    {
        $slug = (string) $request->route('slug');
        $blog = $this->blogApi->getPost($slug, app()->getLocale());

        abort_unless($blog, 404);

        $hasAccess = ! ($blog['is_rv_club_only'] ?? false) || $this->hasBlogAccess((string) $blog['slug']);
        $transformedBlog = $this->transformSinglePostResponse($blog, $hasAccess);

        return Inertia::render('Blog/Show', [
            'blog' => $transformedBlog,
            'relatedBlogs' => $this->relatedPosts($transformedBlog),
        ]);
    }

    public function checkAccess(CheckBlogAccessRequest $request): JsonResponse
    {
        $slug = (string) $request->route('slug');
        $isSubscribed = NewsletterSubscriber::query()
            ->where('email', $request->validated('email'))
            ->exists();

        if ($isSubscribed) {
            $this->grantBlogAccess($slug);
        }

        return response()->json(['subscribed' => $isSubscribed]);
    }

    private function hasBlogAccess(string $postSlug): bool
    {
        $expiry = session("blog_access_{$postSlug}");

        if (! $expiry) {
            return false;
        }

        if (now()->timestamp > $expiry) {
            session()->forget("blog_access_{$postSlug}");

            return false;
        }

        return true;
    }

    private function grantBlogAccess(string $postSlug): void
    {
        session(["blog_access_{$postSlug}" => now()->addDays(7)->timestamp]);
    }

    /**
     * @param  array<string, mixed>  $response
     * @return array<string, mixed>
     */
    private function transformPostsResponse(array $response): array
    {
        $meta = $response['meta'] ?? [];
        $currentPage = (int) ($meta['current_page'] ?? $response['current_page'] ?? 1);
        $lastPage = (int) ($meta['last_page'] ?? $response['last_page'] ?? 1);

        return [
            'data' => array_map(fn (array $post): array => $this->transformPostToCardArray($post), $response['data'] ?? []),
            'current_page' => $currentPage,
            'last_page' => $lastPage,
            'per_page' => (int) ($meta['per_page'] ?? $response['per_page'] ?? 7),
            'total' => (int) ($meta['total'] ?? $response['total'] ?? 0),
            'from' => $meta['from'] ?? null,
            'to' => $meta['to'] ?? null,
            'prev_page_url' => $currentPage > 1 ? $this->paginationUrl($currentPage - 1) : null,
            'next_page_url' => $currentPage < $lastPage ? $this->paginationUrl($currentPage + 1) : null,
            'links' => $this->paginationLinks($currentPage, $lastPage),
        ];
    }

    /**
     * @param  array<string, mixed>  $post
     * @return list<array<string, mixed>>
     */
    private function relatedPosts(array $post): array
    {
        $categoryRelatedPosts = $this->transformedRelatedPosts([
            'locale' => app()->getLocale(),
            'category' => $post['category']['slug'] ?? null,
            'per_page' => 4,
        ], (string) $post['slug']);

        if (count($categoryRelatedPosts) > 0) {
            return $categoryRelatedPosts;
        }

        return $this->transformedRelatedPosts([
            'locale' => app()->getLocale(),
            'per_page' => 4,
        ], (string) $post['slug']);
    }

    /**
     * @param  array<string, mixed>  $filters
     * @return list<array<string, mixed>>
     */
    private function transformedRelatedPosts(array $filters, string $currentSlug): array
    {
        $filters = array_filter($filters, fn (mixed $value): bool => $value !== null && $value !== '');

        return collect($this->transformPostsResponse($this->blogApi->getPosts($filters))['data'])
            ->reject(fn (array $relatedPost): bool => $relatedPost['slug'] === $currentSlug)
            ->take(3)
            ->values()
            ->all();
    }

    /**
     * @param  array<string, mixed>  $post
     * @return array<string, mixed>
     */
    private function transformPostToCardArray(array $post): array
    {
        $content = (string) ($post['content'] ?? '');

        return [
            'id' => $post['id'],
            'title' => $post['title'] ?? '',
            'slug' => $post['slug'],
            'about' => $post['excerpt'] ?? null,
            'read_time' => $post['read_time'] ?? $this->estimatedReadTime($content),
            'publish_date' => $post['published_at'] ?? now()->toISOString(),
            'featured_image' => $post['featured_image'] ?? null,
            'is_rv_club_only' => (bool) ($post['is_rv_club_only'] ?? false),
            'author' => [
                'name' => $post['author']['name'] ?? 'Luxuria',
                'role' => $post['author']['role'] ?? 'Author',
                'image' => $post['author']['image'] ?? null,
            ],
            'category' => $this->transformTaxonomy($post['category'] ?? null),
            'tags' => array_values(array_filter(
                array_map(fn (array $tag): ?array => $this->transformTaxonomy($tag), $post['tags'] ?? [])
            )),
        ];
    }

    /**
     * @param  array<string, mixed>  $post
     * @return array<string, mixed>
     */
    private function transformSinglePostResponse(array $post, bool $hasAccess): array
    {
        return array_merge($this->transformPostToCardArray($post), [
            'content' => $post['content'] ?? '',
            'meta_title' => $post['meta_title'] ?? null,
            'meta_description' => $post['meta_description'] ?? null,
            'og_image' => $post['og_image'] ?? null,
            'has_access' => $hasAccess,
        ]);
    }

    /**
     * @param  array<string, mixed>|null  $taxonomy
     * @return array<string, mixed>|null
     */
    private function transformTaxonomy(?array $taxonomy): ?array
    {
        if (! $taxonomy) {
            return null;
        }

        return [
            'name' => $taxonomy['name'] ?? '',
            'slug' => $taxonomy['slug'] ?? '',
            'posts_count' => (int) ($taxonomy['posts_count'] ?? 0),
        ];
    }

    /**
     * @param  array<string, mixed>|list<array<string, mixed>>  $taxonomies
     * @return list<array<string, mixed>>
     */
    private function transformTaxonomiesResponse(array $taxonomies): array
    {
        $items = $taxonomies['data'] ?? $taxonomies;

        return array_values(array_filter(
            array_map(fn (array $taxonomy): ?array => $this->transformTaxonomy($taxonomy), $items)
        ));
    }

    private function estimatedReadTime(string $content): int
    {
        $wordCount = str_word_count(strip_tags($content));

        return max(1, (int) ceil($wordCount / 200));
    }

    private function paginationUrl(int $page): string
    {
        $query = request()->query();
        $query['page'] = $page;

        $routeName = request()->routeIs('localized.*') ? 'localized.blog' : 'blog';
        $parameters = array_filter($query, fn (mixed $value): bool => $value !== null && $value !== '');

        if ($routeName === 'localized.blog') {
            $parameters = ['locale' => app()->getLocale(), ...$parameters];
        }

        return route($routeName, $parameters);
    }

    /**
     * @return list<array{url: string|null, label: string, active: bool}>
     */
    private function paginationLinks(int $currentPage, int $lastPage): array
    {
        $links = [
            [
                'url' => $currentPage > 1 ? $this->paginationUrl($currentPage - 1) : null,
                'label' => '&laquo; Previous',
                'active' => false,
            ],
        ];

        for ($page = 1; $page <= $lastPage; $page++) {
            $links[] = [
                'url' => $this->paginationUrl($page),
                'label' => (string) $page,
                'active' => $page === $currentPage,
            ];
        }

        $links[] = [
            'url' => $currentPage < $lastPage ? $this->paginationUrl($currentPage + 1) : null,
            'label' => 'Next &raquo;',
            'active' => false,
        ];

        return $links;
    }
}
