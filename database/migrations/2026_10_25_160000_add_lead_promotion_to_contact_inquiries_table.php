<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table): void {
            $table->string('last_name')->nullable();
            $table->string('locale', 5)->nullable();
            $table->timestamp('consented_at')->nullable();
            $table->string('hub_uid', 40)->nullable()->unique();
            $table->string('hub_target', 20)->nullable();
            $table->timestamp('promoted_at')->nullable();
            $table->foreignId('promoted_by')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('promoted_by');
            $table->dropUnique(['hub_uid']);
            $table->dropColumn(['last_name', 'locale', 'consented_at', 'hub_uid', 'hub_target', 'promoted_at']);
        });
    }
};
