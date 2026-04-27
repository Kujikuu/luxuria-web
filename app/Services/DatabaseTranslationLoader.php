<?php

namespace App\Services;

use App\Models\Translation;
use Illuminate\Contracts\Translation\Loader;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Cache;
use Illuminate\Translation\FileLoader;

class DatabaseTranslationLoader implements Loader
{
    /**
     * Cache key prefix for translations
     */
    protected string $cachePrefix = 'translations';

    /**
     * Cache TTL in minutes
     */
    protected int $cacheTtl = 5;

    /**
     * File loader instance for fallback
     */
    protected FileLoader $fileLoader;

    public function __construct()
    {
        $this->fileLoader = new FileLoader(new Filesystem, [
            resource_path('lang'),
            resource_path('lang/vendor'),
        ]);
    }

    /**
     * Load the messages for the given locale.
     *
     * @param  string  $locale
     * @param  string  $group
     * @param  string|null  $namespace
     */
    public function load($locale, $group, $namespace = null): array
    {
        // For namespaced translations (like Filament), use file loader
        if ($namespace !== null && $namespace !== '*') {
            return $this->fileLoader->load($locale, $group, $namespace);
        }

        // Only handle our custom translation groups from database
        $customGroups = ['common', 'pages', 'components'];
        if (! in_array($group, $customGroups)) {
            return $this->fileLoader->load($locale, $group, $namespace);
        }

        $cacheKey = $this->getCacheKey($locale, $group);

        return Cache::remember($cacheKey, $this->cacheTtl * 60, function () use ($locale, $group, $namespace) {
            return array_replace(
                $this->fileLoader->load($locale, $group, $namespace),
                Translation::getGroup($group, $locale),
            );
        });
    }

    /**
     * Add a new namespace to the loader.
     *
     * @param  string  $namespace
     * @param  string  $hint
     */
    public function addNamespace($namespace, $hint): void
    {
        $this->fileLoader->addNamespace($namespace, $hint);
    }

    /**
     * Add a new JSON path to the loader.
     *
     * @param  string  $path
     */
    public function addJsonPath($path): void
    {
        $this->fileLoader->addJsonPath($path);
    }

    /**
     * Get all namespaces.
     */
    public function namespaces(): array
    {
        return $this->fileLoader->namespaces();
    }

    /**
     * Get cache key for translations
     */
    protected function getCacheKey(string $locale, string $group): string
    {
        return "{$this->cachePrefix}.{$locale}.{$group}";
    }

    /**
     * Clear translation cache for a specific locale and group
     */
    public function clearCache(?string $locale = null, ?string $group = null): void
    {
        if ($locale && $group) {
            Cache::forget($this->getCacheKey($locale, $group));
        } else {
            // Clear all translation cache
            Cache::forget($this->cachePrefix.'.*');
        }
    }

    /**
     * Refresh translation cache
     */
    public function refreshCache(): void
    {
        $this->clearCache();

        // Preload common translations for available locales
        $locales = ['en', 'ar'];
        $groups = ['common', 'pages', 'components'];

        foreach ($locales as $locale) {
            foreach ($groups as $group) {
                $this->load($locale, $group);
            }
        }
    }

    /**
     * Get all available translation groups
     */
    public function getAvailableGroups(): array
    {
        return Translation::distinct('group')->pluck('group')->toArray();
    }

    /**
     * Get all available locales
     */
    public function getAvailableLocales(): array
    {
        return Translation::distinct('locale')->pluck('locale')->toArray();
    }
}
