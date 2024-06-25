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
        Schema::create('knowledge_bases', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('knowledge_base_category_id');
            $table->text('question')->unique();
            $table->longText('answer');
            $table->string('slug')->unique();
            $table->string('seo_title')->nullable();
            $table->longText('seo_description')->nullable();
            $table->longText('seo_keywords')->nullable();
            $table->longText('seo_tags')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('knowledge_base_category_id')->references('id')->on('knowledge_base_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_bases');
    }
};
