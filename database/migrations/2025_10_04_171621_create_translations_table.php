<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('group')->index(); // Translation group (e.g., 'common', 'pages', 'components')
            $table->string('key')->index(); // Translation key (e.g., 'home', 'about')
            $table->string('locale', 5)->index(); // Language code (e.g., 'en', 'ar')
            $table->text('value'); // Translation value
            $table->timestamps();
            
            // Ensure unique combination of group, key, and locale
            $table->unique(['group', 'key', 'locale']);
            
            // Add composite indexes for better performance
            $table->index(['group', 'locale']);
            $table->index(['locale', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
