<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\fe\HomeController;
use App\Http\Controllers\fe\AboutController;

// CMS Routes
Route::get('/cms/{path?}', function () {
    return view('app'); // Your CMS React view file
})->where('path', '.*');

// Storage Routes - To Serve Files
Route::get('/storage/{file?}', function ($file) {
    $path = storage_path('app/public/' . $file);

    if (!Storage::exists('public/' . $file)) {
        abort(404);
    }

    return response()->file($path);
})->where('file', '.*');

Route::get('/preload-all-translations', function() {
    $homeController = app(HomeController::class);
    $aboutController = app(AboutController::class);

    // Preload translations for HomeController
    $homeController->preloadTranslations();

    // Preload translations for AboutController
    $aboutController->preloadTranslations();

    return response()->json(['status' => 'success', 'message' => 'All translations preloaded successfully.']);
});

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');



