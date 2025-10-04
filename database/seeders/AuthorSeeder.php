<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Author::factory(1)->create(
            [
                'name' => 'Ahmed Afifi',
                'email' => 'admin@luxuria.com.sa',
                'name_ar' => 'أحمد عفيفي',
                'role' => 'Content Wrtiter',
                'role_ar' => 'كاتب محتوى',
            ]
        );
    }
}
