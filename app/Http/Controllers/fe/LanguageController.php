<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
    
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\JsonResponse;

class LanguageController extends Controller
{
    /**
     * Set the application locale.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function setSiteLocale(string $locale): JsonResponse
    {
        if (in_array($locale, config('app.locales'))) {
            Session::put('locale', $locale);
            App::setLocale($locale);

            return response()->json(['message' => 'Locale set successfully']);
        }

        return response()->json(['error' => 'Invalid locale'], 400);
    }
}