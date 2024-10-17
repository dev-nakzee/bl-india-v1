<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;

class GeoRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $currentHost = $request->getHost(); // Get the current host of the request
        $baseURL = Config::get('app.url'); // Retrieve the base URL from config
        $parsedUrl = parse_url($baseURL); // Parse the URL to extract the domain
        $baseDomain = $parsedUrl['host'] ?? ''; // Default to an empty string if the host isn't set

        // Check if the current host starts with 'in.' or 'global.'
        if (Str::startsWith($currentHost, 'in.') || Str::startsWith($currentHost, 'global.')) {
            // If so, strip the subdomain and redirect to the base domain
            $redirectUrl = $request->getScheme() . '://' . $baseDomain . $request->getRequestUri();
            return Redirect::to($redirectUrl);
        }

        // If no redirection is needed, proceed with the next middleware
        return $next($request);
    }
}
