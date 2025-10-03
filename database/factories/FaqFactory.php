<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => $this->faker->sentence().'?',
            'question_ar' => $this->faker->optional()->sentence().'؟',
            'answer' => $this->faker->paragraphs(2, true),
            'answer_ar' => $this->faker->optional()->paragraphs(2, true),
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => $this->faker->boolean(85), // 85% chance of being active
        ];
    }
}
