<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'title_ar',
        'slug',
        'about',
        'about_ar',
        'read_time',
        'publish_date',
        'featured_image',
        'content',
        'content_ar',
        'author_id',
    ];

    protected function casts(): array
    {
        return [
            'publish_date' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
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
     * Get the localized about text based on the current locale
     */
    public function getLocalizedAbout(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->about_ar) ? $this->about_ar : $this->about;
    }

    /**
     * Get the localized content based on the current locale
     */
    public function getLocalizedContent(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->content_ar) ? $this->content_ar : $this->content;
    }
}
