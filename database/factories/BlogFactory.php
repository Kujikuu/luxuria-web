<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'about' => fake()->paragraph(2),
            'read_time' => fake()->numberBetween(2, 15),
            'publish_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'featured_image' => fake()->imageUrl(800, 400, 'technology', true),
            'content' => $this->generateHtmlContent(),
            'author_id' => Author::factory(),
        ];
    }

    private function generateHtmlContent(): string
    {
        $paragraphs = [];
        for ($i = 0; $i < fake()->numberBetween(3, 8); $i++) {
            $paragraphs[] = '<p>'.fake()->paragraph(fake()->numberBetween(3, 6)).'</p>';
        }

        return implode("\n\n", $paragraphs);
    }
}
