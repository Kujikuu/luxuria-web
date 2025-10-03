<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    /** @use HasFactory<\Database\Factories\FaqFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'question_ar',
        'answer',
        'answer_ar',
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
     * Get the localized question based on the current locale
     */
    public function getLocalizedQuestion(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->question_ar) ? $this->question_ar : $this->question;
    }

    /**
     * Get the localized answer based on the current locale
     */
    public function getLocalizedAnswer(?string $locale = null): string
    {
        $locale = $locale ?: app()->getLocale();

        return ($locale === 'ar' && $this->answer_ar) ? $this->answer_ar : $this->answer;
    }

    /**
     * Scope to only active FAQs
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
