<?php

namespace App\Observers;

use App\Models\Translation;
use Illuminate\Support\Facades\Cache;

class TranslationObserver
{
    /**
     * Handle the Translation "created" event.
     */
    public function created(Translation $translation): void
    {
        $this->clearTranslationCache($translation);
    }

    /**
     * Handle the Translation "updated" event.
     */
    public function updated(Translation $translation): void
    {
        $this->clearTranslationCache($translation);
    }

    /**
     * Handle the Translation "deleted" event.
     */
    public function deleted(Translation $translation): void
    {
        $this->clearTranslationCache($translation);
    }

    /**
     * Handle the Translation "restored" event.
     */
    public function restored(Translation $translation): void
    {
        $this->clearTranslationCache($translation);
    }

    /**
     * Handle the Translation "force deleted" event.
     */
    public function forceDeleted(Translation $translation): void
    {
        $this->clearTranslationCache($translation);
    }

    /**
     * Clear the translation cache for the affected translation
     */
    private function clearTranslationCache(Translation $translation): void
    {
        // Clear specific translation cache
        $cacheKey = "translations.{$translation->locale}.{$translation->group}";
        Cache::forget($cacheKey);
        
        // Also clear Laravel's internal translator cache if it exists
        if (app()->bound('translator')) {
            $translator = app('translator');
            if (method_exists($translator, 'flush')) {
                $translator->flush();
            }
        }
    }
}
