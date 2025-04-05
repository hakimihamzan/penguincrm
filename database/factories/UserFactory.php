<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();
        $email = strtolower(str_replace(' ', '', $name)) . fake()->numberBetween(1, 1000) . '@' . fake()->freeEmailDomain();

        $randomColor1 = fake()->randomElement(['008080', '0000FF', 'FF0000', '00FF00', 'FFFF00']);
        $randomColor2 = fake()->randomElement(['008080', '0000FF', 'FF0000', '00FF00', 'FFFF00']);
        $randomText = 'Hello+' . explode(' ', $name)[0];

        if (fake()->boolean(50)) {
            $avatar = "https://dummyjson.com/image/200x200/{$randomColor1}/{$randomColor2}?text={$randomText}";
        } else {
            $avatar = null;
        }

        return [
            'name' => $name,
            'email' => $email,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'avatar' => $avatar,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
