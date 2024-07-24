<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
/**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update search_vector for existing products
        DB::statement("UPDATE products SET search_vector = to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(technical_name, ''))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionally, you can set search_vector to NULL if you want to reverse this migration
        DB::statement("UPDATE products SET search_vector = NULL");
    }
};
