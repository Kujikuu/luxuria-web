<?php

namespace Database\Seeders;

use App\Models\Translation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting translation import...');

        // Clear existing translations
        Translation::truncate();

        $langPath = resource_path('lang');
        $locales = ['en', 'ar'];
        $groups = ['common', 'pages', 'components'];

        $totalTranslations = 0;

        foreach ($locales as $locale) {
            foreach ($groups as $group) {
                $filePath = $langPath . '/' . $locale . '/' . $group . '.php';
                
                if (File::exists($filePath)) {
                    $this->command->info("Importing {$locale}/{$group}.php...");
                    
                    // Load the translation array from the file
                    $translations = include $filePath;
                    
                    if (is_array($translations)) {
                        $importedCount = $this->importTranslations($translations, $group, $locale);
                        $totalTranslations += $importedCount;
                        $this->command->info("Imported {$importedCount} translations for {$locale}/{$group}");
                    }
                } else {
                    $this->command->warn("Translation file not found: {$filePath}");
                }
            }
        }

        $this->command->info("Translation import completed! Total: {$totalTranslations} translations");
    }

    /**
     * Import translations recursively (handles nested arrays)
     *
     * @param array $translations
     * @param string $group
     * @param string $locale
     * @param string $keyPrefix
     * @return int
     */
    private function importTranslations(array $translations, string $group, string $locale, string $keyPrefix = ''): int
    {
        $count = 0;

        foreach ($translations as $key => $value) {
            $fullKey = $keyPrefix ? $keyPrefix . '.' . $key : $key;

            if (is_array($value)) {
                // Recursively handle nested arrays
                $count += $this->importTranslations($value, $group, $locale, $fullKey);
            } else {
                // Import the translation
                Translation::create([
                    'group' => $group,
                    'key' => $fullKey,
                    'locale' => $locale,
                    'value' => $value,
                ]);
                $count++;
            }
        }

        return $count;
    }
}
