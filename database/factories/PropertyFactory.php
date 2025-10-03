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
            'description' => $this->generateHtmlDescription(),
            'property_area' => fake()->numberBetween(50, 2000),
            'property_location' => $this->generateGoogleMapsLink(),
            'images' => $this->generateImageUrls(),
            'price' => fake()->numberBetween(50000, 5000000),
            'advertising_license_number' => 'ADV-'.fake()->numberBetween(100000, 999999),
            'pdf' => fake()->boolean(70) ? 'property-documents/'.fake()->uuid().'.pdf' : null,
            'featured' => fake()->boolean(30), // 30% chance of being featured
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

    private function generateHtmlDescription(): string
    {
        $descriptions = [
            '<h2>Property Overview</h2><p>This exceptional property offers <strong>modern living</strong> with premium amenities and finishes throughout. Located in a desirable neighborhood, it features:</p><ul><li>Spacious living areas with natural light</li><li>Contemporary kitchen with high-end appliances</li><li>Master suite with walk-in closet</li><li>Private outdoor space</li></ul><blockquote>Perfect for families or professionals seeking luxury and convenience.</blockquote>',
            
            '<h2>Luxury Features</h2><p>Experience <em>unparalleled comfort</em> in this beautifully designed space. Key highlights include:</p><ul><li><strong>Premium flooring</strong> throughout</li><li>Central air conditioning system</li><li>Built-in storage solutions</li><li>24/7 security services</li></ul><h3>Additional Amenities</h3><p>Residents enjoy access to exclusive facilities including fitness center, swimming pool, and landscaped gardens.</p>',
            
            '<h2>Investment Opportunity</h2><p>This property represents an <strong>excellent investment</strong> in a rapidly developing area. Features include:</p><ol><li>High rental yield potential</li><li>Strategic location near business districts</li><li>Modern infrastructure and utilities</li><li>Growing neighborhood with future developments</li></ol><p><em>Contact us today</em> to schedule a private viewing and learn more about financing options.</p>',
            
            '<h2>Prime Location Benefits</h2><p>Strategically positioned for <strong>maximum convenience</strong>, this property offers:</p><ul><li>Easy access to major highways</li><li>Walking distance to shopping centers</li><li>Top-rated schools nearby</li><li>Public transportation connections</li></ul><h3>Neighborhood Highlights</h3><p>The area boasts <em>excellent dining</em>, entertainment venues, and recreational facilities, making it perfect for modern lifestyle needs.</p>'
        ];

        return fake()->randomElement($descriptions);
    }
}
