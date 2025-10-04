<?php

namespace App\Providers;

use App\Services\DatabaseTranslationLoader;
use Illuminate\Support\ServiceProvider;
use Illuminate\Translation\Translator;

class DatabaseTranslationServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // This will be called in boot() after all services are registered
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Replace the translation loader after all services are booted
        $this->app->singleton('translation.loader', function ($app) {
            return new DatabaseTranslationLoader();
        });
        
        // Replace the translator instance
        $this->app->extend('translator', function ($translator, $app) {
            $loader = new DatabaseTranslationLoader();
            $locale = $app['config']['app.locale'];
            
            $trans = new Translator($loader, $locale);
            $trans->setFallback($app['config']['app.fallback_locale']);
            
            return $trans;
        });
    }
}