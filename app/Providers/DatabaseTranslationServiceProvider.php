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
        // Override translation services in register to ensure they take priority
        $this->app->extend('translation.loader', function ($loader, $app) {
            return new DatabaseTranslationLoader();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Additional boot logic if needed
    }
}