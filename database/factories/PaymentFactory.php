<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => $this->faker->randomElement(['pending', 'success', 'failed']),
            'email' => $this->faker->unique()->safeEmail(),
            'amount' => $this->faker->randomFloat(2, 1, 1000), // Random amount between 1 and 1000 with 2 decimal places
        ];
    }
}
