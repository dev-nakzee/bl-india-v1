<?php
use App\Http\Controllers\cms\AuthController;
use App\Http\Controllers\cms\ClientController;
use App\Http\Controllers\cms\ServiceCategoryController;
use App\Http\Controllers\cms\ServiceController;
use App\Http\Controllers\cms\ProductController;
use App\Http\Controllers\cms\ProductCategoryController;
use App\Http\Controllers\cms\ProductServiceMapController;
use App\Http\Controllers\cms\ProcessController;
use App\Http\Controllers\cms\TestimonialController;
use App\Http\Controllers\cms\StickerController;
use App\Http\Controllers\cms\SocialMediaController;
use App\Http\Controllers\cms\PageController;
use App\Http\Controllers\cms\PageSectionController;

Route::prefix('v1/cms')->group(function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/token-valid', [AuthController::class, 'checkTokenValidity'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {
        // Client Routes
        Route::apiResource('clients', ClientController::class);
        // Service Category Routes
        Route::apiResource('service-categories', ServiceCategoryController::class);
        // Service Routes
        Route::apiResource('services', ServiceController::class);
        Route::post('services/{id}', [ServiceController::class, 'update1']);
        // Product Routes
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::post('products/{id}', [ProductController::class, 'update1']);
        Route::apiResource('product-service-maps', ProductServiceMapController::class);
        Route::post('products/{id}/services', [ProductController::class, 'attachServices']);
        Route::delete('products/{productId}/services/{serviceId}', [ProductController::class, 'detachService']);
        Route::get('products/{id}/services', [ProductController::class, 'getServices']);
        // Process Routes
        Route::apiResource('processes', ProcessController::class);
        Route::post('processes/{id}', [ProcessController::class, 'update1']);
        // Testimonials Routes
        Route::apiResource('testimonials', TestimonialController::class);
        // Stickers Routes
        Route::apiResource('stickers', StickerController::class);
        Route::post('stickers/{id}', [StickerController::class, 'update1']);
        // Social Media Routes
        Route::apiResource('social-media', SocialMediaController::class);
        // Pages Routes
        Route::apiResource('pages', PageController::class);
        Route::post('pages/{id}', [PageController::class, 'update1']);
        // Page Sections Routes
        Route::apiResource('page-sections', PageSectionController::class);
        Route::post('page-sections/{id}', [PageSectionController::class, 'update1']);
        // Blog Categories Routes
        Route::apiResource('blog-categories', \App\Http\Controllers\cms\BlogCategoryController::class);
        // Route::post('blog-categories/{id}', [\App\Http\Controllers\cms\BlogCategoryController::class, 'update1']);
        // Blog Routes
        Route::apiResource('blogs', \App\Http\Controllers\cms\BlogController::class);
        Route::post('blogs/{id}', [\App\Http\Controllers\cms\BlogController::class, 'update1']);
        // Blog Comments Routes
        Route::apiResource('blog-comments', \App\Http\Controllers\cms\BlogCommentController::class);
        // Route::post('blog-comments/{id}', [\App\Http\Controllers\cms\BlogCommentController::class, 'update1']);

        // Contacts Routes
        Route::apiResource('contacts', \App\Http\Controllers\cms\ContactController::class);
    });
});