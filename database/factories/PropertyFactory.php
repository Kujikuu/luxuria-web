<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $propertyTypes = Property::PROPERTY_TYPES;
        $propertyCategories = Property::PROPERTY_CATEGORIES;
        $propertyDescriptions = Property::PROPERTY_DESCRIPTIONS;

        $title = fake()->randomElement([
            'Luxury Villa with Pool',
            'Modern Apartment Downtown',
            'Commercial Office Space',
            'Spacious Land Plot',
            'Cozy Studio Apartment',
            'Prime Commercial Building',
            'Family House with Garden',
            'Retail Shop in Mall',
        ]);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1000, 9999),
            'property_type' => fake()->randomElement($propertyTypes),
            'property_category' => fake()->randomElement($propertyCategories),
            'property_description' => fake()->randomElement($propertyDescriptions),
            'property_area' => fake()->numberBetween(50, 2000),
            'property_location' => $this->generateGoogleMapsLink(),
            'images' => $this->generateImageUrls(),
            'price' => fake()->numberBetween(50000, 5000000),
            'advertising_license_number' => 'ADV-'.fake()->numberBetween(100000, 999999),
            'pdf' => fake()->boolean(70) ? 'property-documents/'.fake()->uuid().'.pdf' : null,
        ];
    }

    private function generateGoogleMapsLink(): string
    {
        $lat = fake()->latitude(24.4539, 26.0667); // UAE coordinates range
        $lng = fake()->longitude(51.5795, 56.3968);

        return "https://maps.google.com/?q={$lat},{$lng}";
    }

    private function generateImageUrls(): array
    {
        $imageCount = fake()->numberBetween(3, 8);
        $images = [];

        for ($i = 0; $i < $imageCount; $i++) {
            $images[] = fake()->imageUrl(800, 600, 'business', true);
        }

        return $images;
    }
}
