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
            'request_type' => $this->faker->randomElement(['buy', 'sell', 'rent']),
            'first_name' => $this->faker->firstName(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->safeEmail(),
            'message' => $this->faker->paragraph(3),
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
            'read_at' => fn (array $attributes) => $attributes['is_read']
                ? $this->faker->dateTimeBetween($attributes['created_at'] ?? '-1 week', 'now')
                : null,
        ];
    }
}
