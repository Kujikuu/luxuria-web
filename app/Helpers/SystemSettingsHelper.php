<?php

namespace App\Helpers;

use App\Models\Faq;
use App\Models\Feature;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\Cache;

class SystemSettingsHelper
{
    /**
     * Get all active FAQs ordered by sort_order
     */
    public static function getActiveFaqs(): Collection
    {
        return Cache::remember('active_faqs', 3600, function () {
            return Faq::active()->ordered()->get();
        });
    }

    /**
     * Get all FAQs (including inactive) ordered by sort_order
     */
    public static function getAllFaqs(): Collection
    {
        return Cache::remember('all_faqs', 3600, function () {
            return Faq::ordered()->get();
        });
    }

    /**
     * Get all active features ordered by sort_order
     */
    public static function getActiveFeatures(): Collection
    {
        return Cache::remember('active_features', 3600, function () {
            return Feature::active()->ordered()->get();
        });
    }

    /**
     * Get all features (including inactive) ordered by sort_order
     */
    public static function getAllFeatures(): Collection
    {
        return Cache::remember('all_features', 3600, function () {
            return Feature::ordered()->get();
        });
    }

    /**
     * Clear all system settings cache
     */
    public static function clearCache(): void
    {
        Cache::forget('active_faqs');
        Cache::forget('all_faqs');
        Cache::forget('active_features');
        Cache::forget('all_features');
    }

    /**
     * Get localized FAQs
     */
    public static function getLocalizedFaqs(?string $locale = null): SupportCollection
    {
        $locale = $locale ?: app()->getLocale();
        $faqs = static::getActiveFaqs();

        return $faqs->map(function ($faq) use ($locale) {
            return (object) [
                'id' => $faq->id,
                'question' => $faq->getLocalizedQuestion($locale),
                'answer' => $faq->getLocalizedAnswer($locale),
                'sort_order' => $faq->sort_order,
            ];
        });
    }

    /**
     * Get localized Features
     */
    public static function getLocalizedFeatures(?string $locale = null): SupportCollection
    {
        $locale = $locale ?: app()->getLocale();
        $features = static::getActiveFeatures();

        return $features->map(function ($feature) use ($locale) {
            // Format image URL - add /storage/ prefix only for local files (not full URLs)
            $imageUrl = null;
            if ($feature->image) {
                if (str_starts_with($feature->image, 'http://') || str_starts_with($feature->image, 'https://')) {
                    // External URL - use as is
                    $imageUrl = $feature->image;
                } else {
                    // Local file - add /storage/ prefix
                    $imageUrl = '/storage/'.$feature->image;
                }
            }

            return (object) [
                'id' => $feature->id,
                'title' => $feature->getLocalizedTitle($locale),
                'description' => $feature->getLocalizedDescription($locale),
                'image' => $imageUrl,
                'sort_order' => $feature->sort_order,
            ];
        });
    }
}
