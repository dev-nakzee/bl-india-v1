<?php
use Illuminate\Support\Facades\Route;

// CMS Routes
Route::get('/cms/{path?}', function () {
    return view('app'); // Your CMS React view file
})->where('path', '.*');

// Site Routes
Route::get('/{any?}', function () {
    return view('site'); // Your main site React view file
})->where('any', '.*');
