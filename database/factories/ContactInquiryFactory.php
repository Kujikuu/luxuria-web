<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactInquiry>
 */
class ContactInquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_type' => $this->faker->randomElement(['broker', 'investor', 'project_owner', 'other']),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'locale' => 'en',
            'consented_at' => now(),
            'phone' => '+966512345678',
            'email' => $this->faker->safeEmail(),
            'message' => $this->faker->paragraph(3),
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
            'read_at' => fn (array $attributes) => $attributes['is_read']
                ? $this->faker->dateTimeBetween($attributes['created_at'] ?? '-1 week', 'now')
                : null,
        ];
    }

    public function legacy(): static
    {
        return $this->state(fn (): array => [
            'request_type' => 'buy',
            'last_name' => null,
            'locale' => null,
            'consented_at' => null,
        ]);
    }

    public function promoted(): static
    {
        return $this->state(fn (): array => [
            'hub_uid' => 'SNIPER-L'.fake()->unique()->regexify('[A-Z0-9]{7}'),
            'hub_target' => 'lead',
            'promoted_at' => now(),
        ]);
    }
}
