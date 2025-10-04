<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Translation extends Model
{
    protected $fillable = [
        'group',
        'key',
        'locale',
        'value',
    ];

    /**
     * Get a translation by group, key, and locale
     */
    public static function getTranslation(string $group, string $key, string $locale): ?string
    {
        $translation = static::where('group', $group)
            ->where('key', $key)
            ->where('locale', $locale)
            ->first();

        return $translation?->value;
    }

    /**
     * Set a translation
     */
    public static function setTranslation(string $group, string $key, string $locale, string $value): static
    {
        return static::updateOrCreate(
            ['group' => $group, 'key' => $key, 'locale' => $locale],
            ['value' => $value]
        );
    }

    /**
     * Get all translations for a group and locale
     */
    public static function getGroup(string $group, string $locale): array
    {
        return static::where('group', $group)
            ->where('locale', $locale)
            ->pluck('value', 'key')
            ->toArray();
    }

    /**
     * Get all translations for a locale
     */
    public static function getAllForLocale(string $locale): array
    {
        $translations = static::where('locale', $locale)->get();
        
        $result = [];
        foreach ($translations as $translation) {
            $result[$translation->group][$translation->key] = $translation->value;
        }
        
        return $result;
    }

    /**
     * Scope to filter by group
     */
    public function scopeForGroup(Builder $query, string $group): Builder
    {
        return $query->where('group', $group);
    }

    /**
     * Scope to filter by locale
     */
    public function scopeForLocale(Builder $query, string $locale): Builder
    {
        return $query->where('locale', $locale);
    }
}
