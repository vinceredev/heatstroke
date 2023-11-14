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
        Schema::table('users', function ($table) {
            $table->boolean('is_internal_staff')->default(false);
            $table->string('invitation_token')->nullable();
            $table->string('avatar')->nullable();
            $table->string('status')->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function ($table) {
            $table->dropColumn('is_internal_staff');
            $table->dropColumn('invitation_token');
            $table->dropColumn('avatar');
            $table->dropColumn('status');
        });
    }
};
