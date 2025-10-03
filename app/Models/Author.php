<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    /** @use HasFactory<\Database\Factories\AuthorFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'name_ar',
        'role',
        'role_ar',
        'image',
        'about',
        'about_ar',
    ];

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class);
    }

    /**
     * Get the localized name based on the current locale
     */
    public function getLocalizedName(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->name_ar) ? $this->name_ar : $this->name;
    }

    /**
     * Get the localized role based on the current locale
     */
    public function getLocalizedRole(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->role_ar) ? $this->role_ar : $this->role;
    }

    /**
     * Get the localized about text based on the current locale
     */
    public function getLocalizedAbout(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->about_ar) ? $this->about_ar : $this->about;
    }
}
