<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class LocaleController extends Controller
{
    /**
     * Get translations for a specific locale and namespace
     */
    public function getTranslations(string $locale, string $namespace): JsonResponse
    {
        // Validate locale
        if (! in_array($locale, config('app.available_locales'))) {
            return response()->json(['error' => 'Invalid locale'], 400);
        }

        // Build the path to the translation file
        $translationPath = resource_path("lang/{$locale}/{$namespace}.php");

        // Check if translation file exists
        if (! File::exists($translationPath)) {
            return response()->json([]);
        }

        // Load translations
        $translations = include $translationPath;

        return response()->json($translations);
    }

    /**
     * Get all translations for a specific locale
     */
    public function getAllTranslations(string $locale): JsonResponse
    {
        // Validate locale
        if (! in_array($locale, config('app.available_locales'))) {
            return response()->json(['error' => 'Invalid locale'], 400);
        }

        $translationDir = resource_path("lang/{$locale}");
        $translations = [];

        if (File::isDirectory($translationDir)) {
            $files = File::files($translationDir);

            foreach ($files as $file) {
                if ($file->getExtension() === 'php') {
                    $namespace = pathinfo($file->getFilename(), PATHINFO_FILENAME);
                    $translations[$namespace] = include $file->getPathname();
                }
            }
        }

        return response()->json($translations);
    }
}
