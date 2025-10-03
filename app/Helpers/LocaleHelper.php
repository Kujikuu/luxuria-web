<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;

class LocaleHelper
{
    /**
     * Get the current locale from the URL or session
     */
    public static function getCurrentLocale(): string
    {
        return app()->getLocale();
    }

    /**
     * Get all available locales
     */
    public static function getAvailableLocales(): array
    {
        return config('app.available_locales');
    }

    /**
     * Generate a localized URL
     */
    public static function getLocalizedUrl(string $locale, ?string $route = null, array $parameters = []): string
    {
        $currentRoute = Route::current();

        if ($route) {
            // If a specific route is provided, generate URL for that route
            $routeName = $route;
        } elseif ($currentRoute) {
            // Use current route name
            $routeName = $currentRoute->getName();
            $parameters = array_merge($currentRoute->parameters(), $parameters);
        } else {
            // Fallback to home
            $routeName = 'home';
        }

        // Remove locale from parameters if it exists
        unset($parameters['locale']);

        // Determine if we need to use localized route
        $defaultLocale = config('app.locale');

        if ($locale === $defaultLocale || $locale === 'en') {
            // Use default routes (no prefix)
            return route($routeName, $parameters);
        } else {
            // Use localized routes (with prefix)
            $localizedRouteName = 'localized.'.$routeName;

            // Check if localized route exists, fallback to adding prefix manually
            if (Route::has($localizedRouteName)) {
                return route($localizedRouteName, array_merge(['locale' => $locale], $parameters));
            } else {
                // Fallback: generate default URL and add locale prefix
                $url = route($routeName, $parameters);
                $parsedUrl = parse_url($url);
                $path = $parsedUrl['path'] ?? '/';

                return ($parsedUrl['scheme'] ?? 'http').'://'.$parsedUrl['host']
                    .(isset($parsedUrl['port']) ? ':'.$parsedUrl['port'] : '')
                    .'/'.$locale.$path;
            }
        }
    }

    /**
     * Check if a locale is valid
     */
    public static function isValidLocale(string $locale): bool
    {
        return in_array($locale, static::getAvailableLocales());
    }

    /**
     * Get locale direction (ltr or rtl)
     */
    public static function getDirection(?string $locale = null): string
    {
        $locale = $locale ?? static::getCurrentLocale();

        return in_array($locale, ['ar', 'he', 'fa', 'ur']) ? 'rtl' : 'ltr';
    }

    /**
     * Check if current locale is RTL
     */
    public static function isRtl(?string $locale = null): bool
    {
        return static::getDirection($locale) === 'rtl';
    }
}
