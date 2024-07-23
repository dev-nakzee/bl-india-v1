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
        Schema::create('schedule_calls', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('country_code');
            $table->string('phone');
            $table->string('email');
            $table->dateTime('scheduled_at');
            $table->string('otp')->nullable();
            $table->timestamp('otp_sent_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_calls');
    }
};
