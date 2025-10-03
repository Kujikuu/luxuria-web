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
        'slug',
        'property_type',
        'property_category',
        'property_description',
        'property_area',
        'property_location',
        'images',
        'price',
        'advertising_license_number',
        'pdf',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'property_area' => 'decimal:2',
            'price' => 'decimal:2',
        ];
    }

    // Enum constants for property types
    public const PROPERTY_TYPES = ['sell', 'rent', 'investment', 'share'];

    public const PROPERTY_CATEGORIES = ['residential', 'commercial'];

    public const PROPERTY_DESCRIPTIONS = [
        'land', 'villa', 'apartment', 'room', 'building',
        'commercial_complex', 'station', 'shop', 'other',
    ];
}
