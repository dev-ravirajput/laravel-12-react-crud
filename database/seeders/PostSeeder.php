<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure there are users first
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->info('No users found, skipping post seeding.');
            return;
        }

        foreach (range(1, 50) as $i) {
            Post::create([
                'title' => fake()->sentence,
                'content' => fake()->paragraph(5),
                'is_published' => fake()->boolean(70), // 70% chance true
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
