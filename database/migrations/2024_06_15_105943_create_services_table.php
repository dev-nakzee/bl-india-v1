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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('image_url')->nullable();
            $table->text('thumbnail_url')->nullable();
            $table->string('image_alt')->nullable();
            $table->text('description')->nullable();
            $table->text('compliance_header')->nullable();
            $table->string('seo_title')->nullable();
            $table->longText('seo_description')->nullable();
            $table->longText('seo_keywords')->nullable();
            $table->longText('seo_tags')->nullable();
            $table->boolean('is_global')->default(false);
            $table->unsignedBigInteger('service_category_id');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('service_category_id')->references('id')->on('service_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
