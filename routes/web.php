<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

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

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
