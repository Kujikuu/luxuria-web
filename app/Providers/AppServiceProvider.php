<?php

namespace App\Providers;

use App\Models\Faq;
use App\Models\Feature;
use App\Models\Translation;
use App\Observers\FaqObserver;
use App\Observers\FeatureObserver;
use App\Observers\TranslationObserver;
use App\Services\DatabaseTranslationLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Translation\Translator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model observers
        Faq::observe(FaqObserver::class);
        Feature::observe(FeatureObserver::class);
        Translation::observe(TranslationObserver::class);
    }
}
