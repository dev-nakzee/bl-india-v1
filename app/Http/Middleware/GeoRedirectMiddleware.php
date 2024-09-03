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
        // $jsonPath = public_path('urlMapping.json');

        // // Check if the file exists
        // if (file_exists($jsonPath)) {
        //     // Load JSON data from the file
        //     $json = file_get_contents($jsonPath);
        //     $redirects = json_decode($json, true);

        //     // Get current request path
        //     $currentPath = $request->path();

        //     // Check for a matching old URL in the JSON data
        //     foreach ($redirects as $redirect) {
        //         if ($currentPath === trim($redirect['old_url'], '/')) {
        //             // Redirect to the new URL if a match is found
        //             return redirect($redirect['new_url'], 301);
        //         }
        //     }
        // }
        $location = Location::get($request->ip());

        $targetSubdomain = $location && $location->countryCode === 'IN' ? 'in' : 'global';

        $currentHost = $request->getHost();
        $baseURL = Config::get('app.url'); // Retrieve the base URL from config
        $baseURL = 'https://bl-india.com';
        $parsedUrl = parse_url($baseURL);
        $baseDomain = $parsedUrl['host'] ?? ''; // Extract the domain
        $expectedHost = $targetSubdomain . '.' . $baseDomain;

        if (Str::startsWith($currentHost, 'in.') && $targetSubdomain !== 'in') {
            // $expectedHost = 'global.' . $baseDomain. ':8000';
            $expectedHost = 'global.' . $baseDomain;
        } elseif (Str::startsWith($currentHost, 'global.') && $targetSubdomain !== 'global') {
            // $expectedHost = 'in.' . $baseDomain. ':8000';
            $expectedHost = 'in.' . $baseDomain;
        }

        // Check if current host matches the expected host
        if ($currentHost !== $expectedHost) {
            return redirect()->to($request->getScheme() . '://' . $expectedHost . $request->getRequestUri());
        }

        return $next($request);
    }
}
