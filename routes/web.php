<?php

use App\Helpers\LocaleHelper;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyInquiryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

// Language switching route
Route::get('/language/{locale}', function (Request $request, string $locale) {
    Log::info('Language switch requested', ['locale' => $locale, 'valid' => LocaleHelper::isValidLocale($locale)]);

    if (LocaleHelper::isValidLocale($locale)) {
        Session::put('locale', $locale);
        app()->setLocale($locale);

        Log::info('Locale set in session', ['locale' => $locale, 'app_locale' => app()->getLocale()]);

        // Get the current route and redirect to the localized version
        $currentRoute = $request->headers->get('referer');
        if ($currentRoute) {
            // Parse the current URL
            $parsedUrl = parse_url($currentRoute);
            $path = $parsedUrl['path'] ?? '/';

            // Remove any existing locale prefix
            $availableLocales = config('app.available_locales');
            foreach ($availableLocales as $availableLocale) {
                if (str_starts_with($path, '/'.$availableLocale.'/') || $path === '/'.$availableLocale) {
                    $path = substr($path, strlen('/'.$availableLocale));
                    break;
                }
            }

            // Add new locale prefix if not default locale
            if ($locale !== config('app.locale') && $locale !== 'en') {
                $path = '/'.$locale.$path;
            }

            Log::info('Redirecting to', ['path' => $path ?: '/']);

            return redirect($path ?: '/');
        }
    }

    return redirect('/');
})->name('language.switch');

// Define routes without locale prefix (default English)
Route::get('/', function () {
    return Inertia::render('Home', [
        'featuredProperties' => PropertyController::getFeaturedProperties(),
        'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
        'features' => \App\Helpers\SystemSettingsHelper::getLocalizedFeatures(),
    ]);
})->name('home');

Route::get('/properties', [PropertyController::class, 'index'])->name('properties');
Route::get('/properties/{slug}', [PropertyController::class, 'show'])->name('properties.show');

Route::get('/about', function () {
    return Inertia::render('About', [
        'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
    ]);
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact', [
        'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
    ]);
})->name('contact');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/privacy-policy', function () {
    $page = \App\Models\CustomPage::findBySlug('privacy-policy');
    
    if (!$page) {
        abort(404);
    }
    
    return Inertia::render('CustomPage', [
        'page' => [
            'slug' => $page->slug,
            'title' => $page->getLocalizedTitle(),
            'subtitle' => $page->getLocalizedSubtitle(),
            'content' => $page->getLocalizedContent(),
        ]
    ]);
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    $page = \App\Models\CustomPage::findBySlug('terms-of-service');
    
    if (!$page) {
        abort(404);
    }
    
    return Inertia::render('CustomPage', [
        'page' => [
            'slug' => $page->slug,
            'title' => $page->getLocalizedTitle(),
            'subtitle' => $page->getLocalizedSubtitle(),
            'content' => $page->getLocalizedContent(),
        ]
    ]);
})->name('terms-of-service');

Route::post('/property-inquiries', [PropertyInquiryController::class, 'store'])->name('property-inquiries.store');
Route::post('/contact-inquiries', [ContactInquiryController::class, 'store'])->name('contact-inquiries.store');

// Define routes with locale prefix for non-default locales
Route::group(['prefix' => '{locale}', 'where' => ['locale' => 'ar|he|fa|ur']], function () {

    Route::get('/', function () {
        return Inertia::render('Home', [
            'featuredProperties' => PropertyController::getFeaturedProperties(),
            'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
            'features' => \App\Helpers\SystemSettingsHelper::getLocalizedFeatures(),
        ]);
    })->name('localized.home');

    Route::get('/properties', [PropertyController::class, 'index'])->name('localized.properties');
    Route::get('/properties/{slug}', [PropertyController::class, 'show'])->name('localized.properties.show');

    Route::get('/about', function () {
        return Inertia::render('About', [
            'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
        ]);
    })->name('localized.about');

    Route::get('/contact', function () {
        return Inertia::render('Contact', [
            'faqs' => \App\Helpers\SystemSettingsHelper::getLocalizedFaqs(),
        ]);
    })->name('localized.contact');

    Route::get('/blog', [BlogController::class, 'index'])->name('localized.blog');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('localized.blog.show');

    Route::get('/privacy-policy', function () {
        $page = \App\Models\CustomPage::findBySlug('privacy-policy');
        
        if (!$page) {
            abort(404);
        }
        
        return Inertia::render('CustomPage', [
            'page' => [
                'slug' => $page->slug,
                'title' => $page->getLocalizedTitle(),
                'subtitle' => $page->getLocalizedSubtitle(),
                'content' => $page->getLocalizedContent(),
            ]
        ]);
    })->name('localized.privacy-policy');

    Route::get('/terms-of-service', function () {
        $page = \App\Models\CustomPage::findBySlug('terms-of-service');
        
        if (!$page) {
            abort(404);
        }
        
        return Inertia::render('CustomPage', [
            'page' => [
                'slug' => $page->slug,
                'title' => $page->getLocalizedTitle(),
                'subtitle' => $page->getLocalizedSubtitle(),
                'content' => $page->getLocalizedContent(),
            ]
        ]);
    })->name('localized.terms-of-service');

    Route::post('/property-inquiries', [PropertyInquiryController::class, 'store'])->name('localized.property-inquiries.store');
    Route::post('/contact-inquiries', [ContactInquiryController::class, 'store'])->name('localized.contact-inquiries.store');

});

// API routes for translations
Route::prefix('api')->group(function () {
    Route::get('/translations/{locale}', [App\Http\Controllers\LocaleController::class, 'getAllTranslations']);
    Route::get('/translations/{locale}/{namespace}', [App\Http\Controllers\LocaleController::class, 'getTranslations']);
});
