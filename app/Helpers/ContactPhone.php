<?php

namespace App\Helpers;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ContactPhone implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || self::normalize($value) === null) {
            $fail(__('pages.contact_phone_invalid'));
        }
    }

    public static function normalize(string $phone): ?string
    {
        $digits = preg_replace('/[\s\-().]/u', '', trim($phone)) ?? $phone;

        if (str_starts_with($digits, '00')) {
            $digits = '+'.substr($digits, 2);
        }

        if (preg_match('/^(?:\+?966|0)?(5\d{8})$/', $digits, $matches) === 1) {
            return '+966'.$matches[1];
        }

        if (preg_match('/^\+[1-9]\d{7,14}$/', $digits) === 1 && ! str_starts_with($digits, '+966')) {
            return $digits;
        }

        return null;
    }
}
