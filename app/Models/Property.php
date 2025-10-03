<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    /** @use HasFactory<\Database\Factories\PropertyFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'slug',
        'property_type',
        'property_category',
        'property_description',
        'description',
        'description_ar',
        'property_area',
        'property_location',
        'property_location_ar',
        'images',
        'price',
        'advertising_license_number',
        'pdf',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'property_area' => 'decimal:2',
            'price' => 'decimal:2',
            'featured' => 'boolean',
        ];
    }

    // Enum constants for property types
    public const PROPERTY_TYPES = ['sell', 'rent', 'investment', 'share'];

    public const PROPERTY_CATEGORIES = ['residential', 'commercial'];

    public const PROPERTY_DESCRIPTIONS = [
        'land', 'villa', 'apartment', 'room', 'building',
        'commercial_complex', 'station', 'shop', 'other',
    ];

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
    public function getLocalizedDescription(?string $locale = null): ?string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->description_ar) ? $this->description_ar : $this->description;
    }

    /**
     * Get the localized location based on the current locale
     */
    public function getLocalizedLocation(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->property_location_ar) ? $this->property_location_ar : $this->property_location;
    }
}
