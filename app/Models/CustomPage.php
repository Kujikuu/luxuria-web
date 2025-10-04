<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Helpers\LocaleHelper;

class CustomPage extends Model
{
    /** @use HasFactory<\Database\Factories\CustomPageFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'subtitle', 
        'content',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'subtitle' => 'array',
            'content' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get localized title for current locale
     */
    public function getLocalizedTitle(): string
    {
        $locale = app()->getLocale();
        return $this->title[$locale] ?? $this->title['en'] ?? '';
    }

    /**
     * Get localized subtitle for current locale
     */
    public function getLocalizedSubtitle(): ?string
    {
        $locale = app()->getLocale();
        return $this->subtitle[$locale] ?? $this->subtitle['en'] ?? null;
    }

    /**
     * Get localized content for current locale
     */
    public function getLocalizedContent(): string
    {
        $locale = app()->getLocale();
        return $this->content[$locale] ?? $this->content['en'] ?? '';
    }

    /**
     * Scope to get active pages
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by sort order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Find page by slug
     */
    public static function findBySlug(string $slug): ?self
    {
        return static::where('slug', $slug)->active()->first();
    }
}
