<?php

use App\Http\Controllers\fe\SearchController;
use App\Http\Controllers\fe\HomeController;
use App\Http\Controllers\fe\LanguageController;
use App\Http\Controllers\fe\LayoutController;
use App\Http\Controllers\fe\AboutController;
use App\Http\Controllers\fe\ServiceController;
use App\Http\Controllers\fe\NotificationController;
use App\Http\Controllers\fe\BlogController;

Route::prefix('v1/fe')->group(function(){
    // Layout Routes
    Route::get('/social', [LayoutController::class,'social']);
    Route::get('/footer', [LayoutController::class, 'footer']);
    // Set locale Routes
    Route::get('/set-locale/{locale}', [LanguageController::class, 'setSiteLocale']);
    // Search Page Routes
    Route::get('/search', [SearchController::class,'search']);
    // Home Page Routes
    Route::get('/home', [HomeController::class, 'home']);
    Route::get('/home-banner', [HomeController::class, 'banner']);
    Route::get('/home-services', [HomeController::class, 'services']);
    Route::get('/home-about', [HomeController::class, 'about']);
    Route::get('/home-brochure', [HomeController::class, 'brochure']);
    Route::get('/home-process', [HomeController::class, 'process']);
    Route::get('/home-blog', [HomeController::class, 'blog']);
    Route::get('/home-testimonial', [HomeController::class, 'testimonial']);
    Route::get('/home-associates', [HomeController::class, 'associates']);
    // About Page Routes
    Route::get('/about', [AboutController::class, 'about']);
    Route::get('/about-main', [AboutController::class, 'main']);
    Route::get('/vision-mission', [AboutController::class, 'visionMission']);
    Route::get('/about-team', [AboutController::class, 'team']);
    Route::get('/founder-voice', [AboutController::class, 'founder']);
    Route::get('/about-clients', [AboutController::class, 'clients']);

    // Services Page Routes
    Route::get('/services', [ServiceController::class, 'services']);
    Route::get('/services/{slug}', [ServiceController::class,'serviceDetails']);
    Route::get('/services/{serviceId}/mandatory-products', [ServiceController::class, 'getMandatoryProducts']);

    // Products Page Routes
    Route::get('/products/{slug}', [ServiceController::class, 'productDetails']);

    // Notifications Page Routes
    Route::get('/notifications', [NotificationController::class, 'notifications']);
    Route::get('/notifications/{categorySlug}/{slug}', [NotificationController::class, 'notificationDetails']);

    // Blogs Page Routes
    Route::get('/blogs', [BlogController::class, 'blogs']);
    Route::get('/blogs/{categorySlug}/{slug}', [BlogController::class, 'blogDetails']);

});
