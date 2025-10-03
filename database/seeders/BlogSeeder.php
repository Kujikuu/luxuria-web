<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing authors or create some if none exist
        $authors = Author::all();
        if ($authors->isEmpty()) {
            $authors = Author::factory(3)->create();
        }

        // Create blogs for each author
        foreach ($authors as $author) {
            Blog::factory(fake()->numberBetween(2, 5))
                ->create(['author_id' => $author->id]);
        }
    }
}
