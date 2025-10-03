<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    /** @use HasFactory<\Database\Factories\FeatureFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'description',
        'description_ar',
        'image',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Get the localized title based on the current locale
     */
    public function getLocalizedTitle(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->title_ar) ? $this->title_ar : $this->title;
    }

    /**
     * Get the localized description based on the current locale
     */
    public function getLocalizedDescription(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->description_ar) ? $this->description_ar : $this->description;
    }

    /**
     * Scope to only active features
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by sort_order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
