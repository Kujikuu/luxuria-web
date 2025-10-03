<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'role' => fake()->randomElement(['Writer', 'Editor', 'Blogger', 'Journalist', 'Content Creator', 'Technical Writer']),
            'image' => fake()->imageUrl(300, 300, 'people', true),
            'about' => fake()->paragraph(3),
        ];
    }
}
