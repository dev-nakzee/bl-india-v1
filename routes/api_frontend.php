<?php

use App\Http\Controllers\fe\SearchController;
use App\Http\Controllers\fe\HomeController;
use App\Http\Controllers\fe\LanguageController;

Route::prefix('v1/fe')->group(function(){
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
});
