<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\PostSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ravi Rajput',
            'email' => 'sub800.dev@gmail.com',
            'email_verified_at' => now(),
            'password' => 'sub800.dev@gmail.com',
        ]);

        User::factory(10)->create();
        $this->call(PostSeeder::class);
    }
}
