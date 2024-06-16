<?php
use App\Http\Controllers\cms\AuthController;
use App\Http\Controllers\cms\ServiceCategoryController;
use App\Http\Controllers\cms\ServiceController;

Route::prefix('v1/cms')->group(function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/token-valid', [AuthController::class, 'checkTokenValidity'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('services', ServiceController::class);
    });
});