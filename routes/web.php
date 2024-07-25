<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;

// CMS Routes
Route::get('/cms/{path?}', function () {
    return view('app'); // Your CMS React view file
})->where('path', '.*');

// Route::get('storage/{path}', [ImageController::class, 'show'])->where('path', '.*');

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
