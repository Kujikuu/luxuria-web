<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $availableLocales = config('app.available_locales');
        $locale = null;

        // First, check if locale is provided as a route parameter
        if ($request->route() && $request->route()->parameter('locale')) {
            $routeLocale = $request->route()->parameter('locale');
            if (in_array($routeLocale, $availableLocales)) {
                $locale = $routeLocale;
                Session::put('locale', $locale);
            }
        }

        // If no route parameter, check if locale is provided in the URL segment
        if (! $locale && $request->segment(1) && in_array($request->segment(1), $availableLocales)) {
            $locale = $request->segment(1);
            Session::put('locale', $locale);
        }

        // If no locale found, use session locale if available
        if (! $locale && Session::has('locale')) {
            $locale = Session::get('locale');
        }

        // Finally, use browser language preference or fallback to default
        if (! $locale) {
            $locale = $request->getPreferredLanguage($availableLocales) ?: config('app.locale');
            Session::put('locale', $locale);
        }

        App::setLocale($locale);

        return $next($request);
    }
}
