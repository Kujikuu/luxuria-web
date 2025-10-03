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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('property_type', ['sell', 'rent', 'investment', 'share']);
            $table->enum('property_category', ['residential', 'commercial']);
            $table->enum('property_description', ['land', 'villa', 'apartment', 'room', 'building', 'commercial_complex', 'station', 'shop', 'other']);
            $table->decimal('property_area', 10, 2); // in square meters
            $table->text('property_location'); // Google Maps location link
            $table->json('images'); // Array of image URLs
            $table->decimal('price', 15, 2);
            $table->string('advertising_license_number');
            $table->string('pdf')->nullable(); // PDF file path
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
