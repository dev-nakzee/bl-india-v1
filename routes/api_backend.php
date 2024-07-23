<?php
use App\Http\Controllers\cms\AuthController;
use App\Http\Controllers\cms\ClientController;
use App\Http\Controllers\cms\ServiceCategoryController;
use App\Http\Controllers\cms\ServiceController;
use App\Http\Controllers\cms\ServiceSectionController;
use App\Http\Controllers\cms\ProductController;
use App\Http\Controllers\cms\ProductCategoryController;
use App\Http\Controllers\cms\ProductServiceMapController;
use App\Http\Controllers\cms\ProcessController;
use App\Http\Controllers\cms\TestimonialController;
use App\Http\Controllers\cms\StickerController;
use App\Http\Controllers\cms\SocialMediaController;
use App\Http\Controllers\cms\PageController;
use App\Http\Controllers\cms\PageSectionController;
use App\Http\Controllers\cms\ContactController;
use App\Http\Controllers\cms\NotificationCategoryController;
use App\Http\Controllers\cms\NotificationController;
use App\Http\Controllers\cms\DownloadCategoryController;
use App\Http\Controllers\cms\DownloadController;
use App\Http\Controllers\cms\DownloadFileController;
use App\Http\Controllers\cms\GalleryController;
use App\Http\Controllers\cms\HolidayController;
use App\Http\Controllers\cms\KnowledgeBaseCategoryController;
use App\Http\Controllers\cms\KnowledgeBaseController;
use App\Http\Controllers\cms\TutorialController;
use App\Http\Controllers\cms\BrochureController;
use App\Http\Controllers\cms\ImageUploadController;
use App\Http\Controllers\cms\SiteSettingController;

Route::prefix('v1/cms')->group(function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/token-valid', [AuthController::class, 'checkTokenValidity'])->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::middleware('auth:sanctum')->group(function () {

        // routes/api.php

        Route::post('/upload-image', [ImageUploadController::class, 'upload']);
        Route::apiResource('clients', ClientController::class);
        // Service Category Routes
        Route::apiResource('service-categories', ServiceCategoryController::class);
        // Service Routes
        Route::apiResource('services', ServiceController::class);
        Route::post('services/{id}', [ServiceController::class, 'update1']);
        // Service Section Routes
        Route::apiResource('service-sections', ServiceSectionController::class);
        Route::post('service-sections/{id}', [ServiceSectionController::class, 'update1']);
        // Product Routes
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::post('products/{id}', [ProductController::class, 'update1']);
        Route::apiResource('product-service-maps', ProductServiceMapController::class);
        Route::post('products/{id}/services', [ProductController::class, 'attachServices']);
        Route::delete('products/{productId}/services/{serviceId}', [ProductController::class, 'detachService']);
        Route::get('products/{id}/services', [ProductController::class, 'getServices']);
        Route::put('products/{id}/services/{serviceId}', [ProductController::class, 'updateService']); 
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
        Route::post('contacts/{id}', [\App\Http\Controllers\cms\ContactController::class, 'update1']);

        // Notifications Category Routes
        Route::apiResource('notification-categories', \App\Http\Controllers\cms\NotificationCategoryController::class);
        Route::post('notification-categories/{id}', [\App\Http\Controllers\cms\NotificationCategoryController::class, 'update1']);

        // Notifications Route
        Route::apiResource('notifications', \App\Http\Controllers\cms\NotificationController::class);
        Route::post('notifications/{id}', [\App\Http\Controllers\cms\NotificationController::class, 'update1']);
        Route::get('/notifications/{id}/products', [NotificationController::class, 'getProducts']);
        Route::post('/notifications/{id}/products', [NotificationController::class, 'attachProducts']);
        Route::delete('/notifications/{notificationId}/products/{productId}', [NotificationController::class, 'detachProduct']);

        // Download Category Routes
        Route::apiResource('download-categories', \App\Http\Controllers\cms\DownloadCategoryController::class);

        // Routes for Downloads
        Route::apiResource('/downloads', DownloadController::class);
        Route::post('downloads/{id}', [\App\Http\Controllers\cms\DownloadController::class, 'update1']);

        Route::prefix('downloads/{downloadId}')->group(function () {
            Route::get('files', [DownloadFileController::class, 'index']);
            Route::post('files', [DownloadFileController::class, 'store']);
            Route::get('files/{fileId}', [DownloadFileController::class, 'show']);
            Route::put('files/{fileId}', [DownloadFileController::class, 'update']);
            Route::delete('files/{fileId}', [DownloadFileController::class, 'destroy']);
        });

        // Customer routes
        Route::apiResource('customers', \App\Http\Controllers\cms\CustomerController::class);
        Route::post('customers/{id}', [\App\Http\Controllers\cms\CustomerController::class, 'update1']);

        // Teams routes
        Route::apiResource('teams', \App\Http\Controllers\cms\TeamController::class);
        Route::post('teams/{id}', [\App\Http\Controllers\cms\TeamController::class, 'update1']);

        // Gallery routes
        Route::apiResource('galleries', \App\Http\Controllers\cms\GalleryController::class);
        Route::post('galleries/{id}', [\App\Http\Controllers\cms\GalleryController::class, 'update1']);

        // Holiday routes
        Route::apiResource('holidays', \App\Http\Controllers\cms\HolidayController::class);

        // Knowledge Category routes
        Route::apiResource('knowledge-categories', KnowledgeBaseCategoryController::class);
        Route::post('knowledge-categories/{id}', [KnowledgeBaseCategoryController::class, 'update1']);

        // Knowledge routes
        Route::apiResource('knowledge-base', KnowledgeBaseController::class);
        Route::post('knowledge-base/{id}', [KnowledgeBaseController::class, 'update1']);

        // Tutorials routes
        Route::apiResource('tutorials', TutorialController::class);

        // Brochures routes
        Route::apiResource('brochures', BrochureController::class);
        Route::post('brochures/{id}', [BrochureController::class, 'update1']);

        Route::apiResource('settings', SiteSettingController::class);
    });
});