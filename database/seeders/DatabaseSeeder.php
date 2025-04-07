<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Organization;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@email.com',
            'password' => bcrypt('password'),
        ]);

        User::factory(55)->create();

        Contact::factory(49)->create();

        Payment::factory(77)->create();

        Organization::factory(33)->create();
    }
}
