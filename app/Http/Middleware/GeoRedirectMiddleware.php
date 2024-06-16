<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;

class GeoRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $location = Location::get($request->ip());

        // Assuming 'IN' as the country code for India, adjust as necessary
        $targetSubdomain = $location && $location->countryCode === 'IN' ? 'in' : 'global';

        $currentHost = $request->getHost();
        $baseURL = Config::get('app.url'); // Retrieve the base URL from config
        $parsedUrl = parse_url($baseURL);
        $baseDomain = $parsedUrl['host'] ?? ''; // Extract the domain

        // Prepend the subdomain to the base domain
        $expectedHost = $targetSubdomain . '.' . $baseDomain.':8000';

        if (!Str::startsWith($currentHost, $targetSubdomain)) {
            return redirect()->to($request->getScheme() . '://' . $expectedHost . $request->getRequestUri());
        }

        return $next($request);
    }
}
