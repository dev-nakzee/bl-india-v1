<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('site');
});

Route::get('/cms', function () {
    return view('app');
});