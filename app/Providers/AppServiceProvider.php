<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        if(Session::get('locale'))
        {
            $locale = Session::get('locale');
        }
        else
        {
            $locale = config('app.locale');
        }
        App::setLocale($locale);
    }
}
