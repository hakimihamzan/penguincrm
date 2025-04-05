<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company;

        $randomColor1 = fake()->randomElement(['008080', '0000FF', 'FF0000', '00FF00', 'FFFF00']);
        $randomColor2 = fake()->randomElement(['008080', '0000FF', 'FF0000', '00FF00', 'FFFF00']);
        $randomText = 'Hello+'.explode(' ', $name)[0];

        if (fake()->boolean(50)) {
            $logo = "https://dummyjson.com/image/200x200/{$randomColor1}/{$randomColor2}?text={$randomText}";
        } else {
            $logo = null;
        }

        return [
            'name' => $name,
            'description' => fake()->realText(),
            'logo' => $logo,
            'email' => fake()->unique()->safeEmail,
            'phone' => fake()->phoneNumber,
            'website' => fake()->url,
            'city' => fake()->city,
            'state' => fake()->state,
            'country' => fake()->country,
            'employee_count' => fake()->numberBetween(1, 10000),
            'founded_date' => fake()->dateTimeBetween('-30 years', 'now'),
            'is_active' => fake()->boolean(80), // 80% chance to be true
        ];
    }
}
