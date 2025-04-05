<?php

namespace Database\Seeders;

use App\Models\Contact;
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
        User::factory(49)->create();

        Contact::factory(49)->create();

        Payment::factory(49)->create();
    }
}
