<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        $products = Product::all();

        foreach ($products as $product) {
            // Update search_vector for each product
            DB::statement("UPDATE products SET search_vector = to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')) WHERE id = ?", [$product->id]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
