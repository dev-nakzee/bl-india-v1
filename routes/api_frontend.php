<?php

use App\Http\Controllers\fe\SearchController;
use App\Http\Controllers\fe\HomeController;

Route::prefix('v1/fe')->group(function(){
    // Home Page Routes
    Route::get('/home', [HomeController::class, 'home']);
    Route::get('/home-banner', [HomeController::class, 'banner']);
    Route::get('/home-services', [HomeController::class, 'services']);
    Route::get('/home-about', [HomeController::class, 'about']);
    Route::get('/home-brochure', [HomeController::class, 'brochure']);
});
