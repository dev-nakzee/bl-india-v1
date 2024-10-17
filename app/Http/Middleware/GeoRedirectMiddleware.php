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

        $targetSubdomain = $location && $location->countryCode === 'IN' ? 'in' : 'global';

        $currentHost = $request->getHost();
        $baseURL = Config::get('app.url'); // Retrieve the base URL from config
        $baseURL = 'https://bl-india.com';
        $parsedUrl = parse_url($baseURL);
        $baseDomain = $parsedUrl['host'] ?? ''; // Extract the domain
        $expectedHost = $baseDomain;

        if (Str::startsWith($currentHost, 'in.')) {
            // $expectedHost = $baseDomain. ':8000';
            $expectedHost = $baseDomain;
        } elseif (Str::startsWith($currentHost, 'global.')) {
            // $expectedHost = $baseDomain. ':8000';
            $expectedHost = $baseDomain;
        }

        // Check if current host matches the expected host
        if ($currentHost !== $expectedHost) {
            return redirect()->to($request->getScheme() . '://' . $expectedHost . $request->getRequestUri());
        }

        return $next($request);
    }
}
