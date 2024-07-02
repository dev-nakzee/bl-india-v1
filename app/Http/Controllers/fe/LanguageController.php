<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
    
use Illuminate\Support\Facades\App;
// use Illuminate\Support\Facades\Session;
use Illuminate\Session\SessionManager;
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
            if(session()->put('locale', $locale))
            {
                App::setLocale($locale);

                return response()->json(['message' => 'Locale set successfully to '. session()->get('locale')]);
            }
          
        }

        return response()->json(['error' => 'Invalid locale'], 400);
    }

    public function getSiteLocale(): JsonResponse
    {
        return response()->json(['locale' => session()->get('locale')]);
    }
}