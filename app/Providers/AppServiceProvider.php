<?php

namespace App\Providers;

use App\Models\Faq;
use App\Models\Feature;
use App\Observers\FaqObserver;
use App\Observers\FeatureObserver;
use Illuminate\Support\ServiceProvider;

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
    }
}
