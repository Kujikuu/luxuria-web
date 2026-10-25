<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use RuntimeException;
use Throwable;

class SniperHubIntake
{
    public const CONFLICT = 409;

    public static function isEnabled(): bool
    {
        return (bool) config('services.sniperhub.intake_enabled')
            && filled(config('services.sniperhub.intake_key'));
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function submit(string $target, array $payload, string $locale, string $idempotencyKey): string
    {
        $url = config($target === 'application' ? 'services.sniperhub.intake_url' : 'services.sniperhub.leads_url');

        if (! self::isEnabled() || ! is_string($url) || ! filter_var($url, FILTER_VALIDATE_URL) || parse_url($url, PHP_URL_SCHEME) !== 'https') {
            throw new \DomainException('Sniper Hub is not connected for this lead type. Configure its HTTPS endpoint and intake credentials before promoting.');
        }

        try {
            $response = Http::withToken((string) config('services.sniperhub.intake_key'))
                ->withHeaders(['Idempotency-Key' => $idempotencyKey])
                ->acceptJson()
                ->asJson()
                ->withOptions(['allow_redirects' => false])
                ->connectTimeout(3)
                ->timeout(max(1, min(30, (int) config('services.sniperhub.timeout', 10))))
                ->retry(2, 500, fn (Throwable $exception): bool => $exception instanceof ConnectionException
                    || ($exception instanceof RequestException && $exception->response->serverError()), throw: false)
                ->post($url, [
                    ...$payload,
                    'locale' => $locale,
                    'source_site' => (string) config('app.url'),
                ]);
        } catch (ConnectionException $exception) {
            throw new RuntimeException('Sniper Hub did not confirm receipt. Retry this same lead; its idempotency key is preserved.', previous: $exception);
        }

        if ($response->status() === 422) {
            $errors = $response->json('errors');

            throw ValidationException::withMessages(is_array($errors) && $errors !== []
                ? $errors : ['hub' => 'Sniper Hub refused these lead details.']);
        }

        if ($response->status() === self::CONFLICT) {
            throw new RuntimeException('Sniper Hub has this lead key with different details. Review the existing Hub record before retrying.', self::CONFLICT);
        }

        $uid = $response->json('data.uid');

        if (! $response->successful() || ! is_string($uid) || trim($uid) === '' || strlen($uid) > 40) {
            throw new RuntimeException('Sniper Hub did not confirm receipt. Retry this same lead; its idempotency key is preserved.');
        }

        return $uid;
    }
}
