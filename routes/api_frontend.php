<?php

use App\Http\Controllers\fe\SearchController;
use App\Http\Controllers\fe\HomeController;
use App\Http\Controllers\fe\LanguageController;
use App\Http\Controllers\fe\LayoutController;
use App\Http\Controllers\fe\AboutController;
use App\Http\Controllers\fe\ServiceController;
use App\Http\Controllers\fe\NotificationController;
use App\Http\Controllers\fe\BlogController;
use App\Http\Controllers\fe\GalleryController;
use App\Http\Controllers\fe\KnowledgeBaseController;
use App\Http\Controllers\fe\CareerController;
use App\Http\Controllers\fe\ContactController;
use App\Http\Controllers\fe\DownloadController;
use App\Http\Controllers\fe\ClientController;
use App\Http\Controllers\fe\TutorialController;
use App\Http\Controllers\fe\BrochureController;
use App\Http\Controllers\fe\ScheduleCallController;
use App\Http\Controllers\fe\PartnerWithUsController;
use App\Http\Controllers\fe\CommentController;

Route::prefix('v1/fe')->group(function(){
    // Layout Routes
    Route::get('/top-bar', [LayoutController::class,'topBar']);
    Route::get('/footer', [LayoutController::class, 'footer']);
    Route::get('/terms-conditions', [LayoutController::class, 'termsConditions']);
    Route::get('/privacy-policy', [LayoutController::class, 'privacyPolicy']);
    Route::get('/website-disclaimer', [LayoutController::class, 'websiteDisclaimer']);
    Route::get('/holiday-list', [LayoutController::class, 'holidayList']);
    // Set locale Routes
    Route::get('/get-locale', [LanguageController::class, 'getSiteLocale']);
    Route::get('/set-locale/{locale}', [LanguageController::class, 'setSiteLocale']);

    // Search Page Routes
    Route::post('/search', [SearchController::class,'search']);
    
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
    Route::post('blogs/{blogId}/comments', [BlogController::class, 'postComment'])->middleware('auth:sanctum');

    // Gallery Pages Routes
    Route::get('/galleries', [GalleryController::class, 'gallery']);

    // Careers Page Routes
    Route::get('/careers', [CareerController::class, 'careers']);

    // Knowledge Resources Routes
    Route::get('/knowledge-base', [KnowledgeBaseController::class, 'knowledgeBase']);
    Route::get('/knowledge-base/find/{searchKeywords}', [KnowledgeBaseController::class, 'knowledgeBaseSearch']);
    Route::get('/knowledge-base/{slug}', [KnowledgeBaseController::class, 'knowledgeBaseCategory']);

    // Contact Page Routes
    Route::get('/contact', [ContactController::class, 'contact']);
    Route::post('/contact-form', [ContactController::class, 'contactForm']);

    // Download Page Routes
    Route::get('/downloads', [DownloadController::class, 'download']);

    // Route to handle brochure form submission
    Route::post('/submit-brochure', [BrochureController::class, 'create'])->name('brochure.submit');

    // Route to verify OTP
    Route::post('/verify-otp', [BrochureController::class, 'verifyOtp'])->name('brochure.verifyOtp');

    Route::post('/schedule', [ScheduleCallController::class, 'store']);
    Route::post('/schedule-verify-otp', [ScheduleCallController::class,'verifyOtp']);

    Route::post('/partner-with-us', [PartnerWithUsController::class, 'store']);

    Route::prefix('client')->group(function () {
        Route::post('register', [ClientController::class, 'register']);
        Route::post('verify-register-otp', [ClientController::class, 'verifyRegisterOtp']);
        Route::post('login', [ClientController::class, 'login']);
        Route::post('verify-login-otp', [ClientController::class, 'verifyLoginOtp']);
        Route::get('check-token', [ClientController::class, 'checkToken'])->middleware('auth:sanctum');
        Route::post('logout', [ClientController::class, 'logout'])->middleware('auth:sanctum');
        Route::post('change-password', [ClientController::class, 'changePassword'])->middleware('auth:sanctum');
        Route::get('tutorials', [TutorialController::class, 'tutorial'])->middleware('auth:sanctum');
        Route::get('comments', [CommentController::class, 'comments'])->middleware('auth:sanctum');
        Route::get('brochures', [BrochuresController::class, 'brochures'])->middleware('auth:sanctum');
    });

    Route::post('/client/forgot-password', [ClientController::class, 'forgotPassword']);
    Route::get('/password-reset/{token}', [ClientController::class, 'validateToken']);
    Route::post('/password-reset', [ClientController::class, 'resetPassword']);
});
