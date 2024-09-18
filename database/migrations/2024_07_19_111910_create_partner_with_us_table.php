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
        Schema::create('partner_with_us', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('country_code');
            $table->string('phone');
            $table->enum('partner_type', ['Service Partner', 'Channel Partner']);
            $table->enum('entity_type', ['Organization', 'Individual']);
            $table->string('organization')->nullable();
            $table->string('designation')->nullable();
            $table->string('field_of_expertise')->nullable();
            $table->string('year_of_experience')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partner_with_us');
    }
};
