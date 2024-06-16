<?php
use App\Http\Controllers\cms\AuthController;
use App\Http\Controllers\cms\ServiceCategoryController;
use App\Http\Controllers\cms\ServiceController;
use App\Http\Controllers\cms\ProductController;
use App\Http\Controllers\cms\ProductCategoryController;
use App\Http\Controllers\cms\ProductServiceMapController;
use App\Http\Controllers\cms\ProcessController;

Route::prefix('v1/cms')->group(function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/token-valid', [AuthController::class, 'checkTokenValidity'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {
        // Service Category Routes
        Route::apiResource('service-categories', ServiceCategoryController::class);
        // Service Routes
        Route::apiResource('services', ServiceController::class);
        Route::post('services/{id}', [ServiceController::class, 'update1']);
        // Product Routes
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::apiResource('product-service-maps', ProductServiceMapController::class);
        Route::post('products/{id}/services', [ProductController::class, 'attachServices']);
        Route::delete('products/{productId}/services/{serviceId}', [ProductController::class, 'detachService']);
        Route::get('products/{id}/services', [ProductController::class, 'getServices']);
        // Process Routes
        Route::apiResource('processes', ProcessController::class);
    });
});