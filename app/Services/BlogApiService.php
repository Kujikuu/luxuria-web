<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BlogApiService
{
    /**
     * @param  array<string, mixed>  $filters
     * @return array<string, mixed>
     */
    public function getPosts(array $filters = []): array
    {
        try {
            $payload = $this->client()
                ->get('blog/posts', $filters)
                ->throw()
                ->json();

            if (is_array($payload)) {
                return $payload;
            }
        } catch (\Throwable $exception) {
            Log::error('Failed to fetch blog posts', [
                'error' => $exception->getMessage(),
                'filters' => $filters,
            ]);
        }

        return [
            'data' => [],
            'current_page' => 1,
            'last_page' => 1,
            'per_page' => (int) ($filters['per_page'] ?? 7),
            'total' => 0,
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function getPost(string $slug, string $locale = 'en'): ?array
    {
        try {
            $payload = $this->client()
                ->get("blog/posts/{$slug}", ['locale' => $locale])
                ->throw()
                ->json('data');

            return is_array($payload) ? $payload : null;
        } catch (\Throwable $exception) {
            Log::error('Failed to fetch blog post', [
                'error' => $exception->getMessage(),
                'slug' => $slug,
                'locale' => $locale,
            ]);

            return null;
        }
    }

    /**
     * @return array<string, mixed>|list<array<string, mixed>>
     */
    public function getCategories(string $locale = 'en'): array
    {
        try {
            $payload = $this->client()
                ->get('blog/categories', ['locale' => $locale])
                ->throw()
                ->json();

            return is_array($payload) ? $payload : [];
        } catch (\Throwable $exception) {
            Log::error('Failed to fetch blog categories', [
                'error' => $exception->getMessage(),
                'locale' => $locale,
            ]);

            return [];
        }
    }

    /**
     * @return array<string, mixed>|list<array<string, mixed>>
     */
    public function getTags(string $locale = 'en'): array
    {
        try {
            $payload = $this->client()
                ->get('blog/tags', ['locale' => $locale])
                ->throw()
                ->json();

            return is_array($payload) ? $payload : [];
        } catch (\Throwable $exception) {
            Log::error('Failed to fetch blog tags', [
                'error' => $exception->getMessage(),
                'locale' => $locale,
            ]);

            return [];
        }
    }

    private function client(): PendingRequest
    {
        return Http::baseUrl($this->apiBaseUrl())
            ->acceptJson()
            ->withHeaders([
                'X-Website-Api-Key' => (string) config('services.blog.api_key'),
            ])
            ->timeout(10);
    }

    private function apiBaseUrl(): string
    {
        $url = rtrim((string) config('services.blog.url'), '/');

        return str_ends_with($url, '/api') ? $url : "{$url}/api";
    }
}
