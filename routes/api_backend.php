<?php
use App\Http\Controllers\cms\AuthController;
use App\Http\Controllers\cms\ServiceCategoryController;
use App\Http\Controllers\cms\ServiceController;
use App\Http\Controllers\cms\ProductController;
use App\Http\Controllers\cms\ProductCategoryController;
use App\Http\Controllers\cms\ProductServiceMapController;

Route::prefix('v1/cms')->group(function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/token-valid', [AuthController::class, 'checkTokenValidity'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('services', ServiceController::class);
        Route::post('services/{id}', [ServiceController::class, 'update1']);
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::apiResource('product-service-maps', ProductServiceMapController::class);
        Route::post('products/{id}/services', [ProductController::class, 'attachServices']);
        Route::delete('products/{productId}/services/{serviceId}', [ProductController::class, 'detachService']);
        Route::get('products/{id}/services', [ProductController::class, 'getServices']);
    });
});