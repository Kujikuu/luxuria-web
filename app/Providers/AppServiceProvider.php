<?php

namespace App\Providers;

use App\Models\ContactInquiry;
use App\Models\Faq;
use App\Models\Feature;
use App\Models\Translation;
use App\Models\User;
use App\Observers\FaqObserver;
use App\Observers\FeatureObserver;
use App\Observers\TranslationObserver;
use Illuminate\Support\Facades\Gate;
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
        Gate::define('promote-contact-lead', fn (User $user, ContactInquiry $lead): bool => in_array((int) $user->getKey(), config('contact-leads.approver_ids', []), true));

        // Register model observers
        Faq::observe(FaqObserver::class);
        Feature::observe(FeatureObserver::class);
        Translation::observe(TranslationObserver::class);
    }
}
