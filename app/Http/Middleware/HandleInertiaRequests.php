<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => [
                'current' => app()->getLocale(),
                'available' => config('app.available_locales'),
            ],
            'translations' => $this->getTranslations(app()->getLocale()),
        ];
    }

    /**
     * Get all translations for the given locale from the database
     */
    private function getTranslations(string $locale): array
    {
        $translations = [];
        
        // Get all unique groups for this locale from the database
        $groups = \App\Models\Translation::where('locale', $locale)
            ->select('group')
            ->distinct()
            ->pluck('group');

        // Load translations for each group using Laravel's translation service
        // This will use our DatabaseTranslationLoader
        foreach ($groups as $group) {
            $translations[$group] = app('translator')->get($group, [], $locale);
        }

        return $translations;
    }
}
