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
        Schema::table('products', function (Blueprint $table) {
            $table->longText('search_vector')->nullable();
        });

        // Create a GIN index on the search vector
        DB::statement('CREATE INDEX products_search_vector_index ON products USING GIN(to_tsvector(\'english\', coalesce(name, \'\') || \' \' || coalesce(description, \'\')));');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('search_vector');
        });

        DB::statement('DROP INDEX IF EXISTS products_search_vector_index;');
    }
};
