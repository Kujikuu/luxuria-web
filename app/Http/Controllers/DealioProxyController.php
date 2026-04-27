<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDealioLeadRequest;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class DealioProxyController extends Controller
{
    private const REAL_ESTATE_INDUSTRY = 'real-estate';

    public function opportunities(Request $request): JsonResponse
    {
        $query = $request->query();
        unset($query['industry'], $query['industry[]']);

        $query['industry'] = [self::REAL_ESTATE_INDUSTRY];

        $response = $this->dealio()->get('/api/v1/opportunities', $query);

        return $this->jsonResponse($response->json(), $response->status());
    }

    public function show(string $slug): JsonResponse
    {
        $response = $this->dealio()->get("/api/v1/opportunities/{$slug}");

        if (! $response->successful()) {
            return $this->jsonResponse($response->json(), $response->status());
        }

        $payload = $response->json();
        $opportunity = $payload['data'] ?? $payload;

        if (! is_array($opportunity) || ! $this->isRealEstateOpportunity($opportunity)) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return response()->json($payload);
    }

    public function similar(string $slug): JsonResponse
    {
        $response = $this->dealio()->get("/api/v1/opportunities/{$slug}/similar");

        if (! $response->successful()) {
            return $this->jsonResponse($response->json(), $response->status());
        }

        $payload = $response->json();
        $items = collect($payload['data'] ?? $payload)
            ->filter(fn (mixed $opportunity): bool => is_array($opportunity) && $this->isRealEstateOpportunity($opportunity))
            ->values()
            ->all();

        if (is_array($payload) && array_key_exists('data', $payload)) {
            $payload['data'] = $items;
        } else {
            $payload = $items;
        }

        return response()->json($payload);
    }

    public function trackView(string $slug): JsonResponse
    {
        $response = $this->dealio()->post("/api/v1/opportunities/{$slug}/view");

        return $this->jsonResponse($response->json(), $response->status());
    }

    public function regions(): JsonResponse
    {
        $response = $this->dealio()->get('/api/v1/regions');

        return $this->jsonResponse($response->json(), $response->status());
    }

    public function types(): JsonResponse
    {
        $response = $this->dealio()->get('/api/v1/types');

        return $this->jsonResponse($response->json(), $response->status());
    }

    public function leads(StoreDealioLeadRequest $request): JsonResponse
    {
        $response = $this->dealio()->post('/api/v1/leads', $request->validated());

        return $this->jsonResponse($response->json(), $response->status());
    }

    private function dealio(): PendingRequest
    {
        return Http::baseUrl(rtrim((string) config('services.dealio.api_url'), '/'))
            ->withToken((string) config('services.dealio.api_token'))
            ->acceptJson()
            ->withHeaders([
                'Accept-Language' => app()->getLocale(),
            ]);
    }

    private function jsonResponse(mixed $payload, int $status): JsonResponse
    {
        return response()->json($payload ?? ['message' => 'Dealio request failed'], $status);
    }

    /**
     * @param  array<string, mixed>  $opportunity
     */
    private function isRealEstateOpportunity(array $opportunity): bool
    {
        $industryValues = collect([
            Arr::get($opportunity, 'industry'),
            Arr::get($opportunity, 'industry.slug'),
            Arr::get($opportunity, 'industry.name'),
            Arr::get($opportunity, 'industry_key'),
            Arr::get($opportunity, 'industry_slug'),
        ])->filter(fn (mixed $value): bool => is_scalar($value));

        if (is_array(Arr::get($opportunity, 'industries'))) {
            foreach (Arr::get($opportunity, 'industries') as $industry) {
                $industryValues->push(is_array($industry) ? ($industry['slug'] ?? $industry['name'] ?? null) : $industry);
            }
        }

        return $industryValues
            ->map(fn (mixed $value): string => str((string) $value)->lower()->replace(['-', '_', ' '], '')->toString())
            ->contains(str(self::REAL_ESTATE_INDUSTRY)->replace('-', '')->toString());
    }
}
