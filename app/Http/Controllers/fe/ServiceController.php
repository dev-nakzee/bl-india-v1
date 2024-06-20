<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function services(Request $request): JsonResponse
    {
        $page = Page::where('slug', 'services')->first();
        $query = Service::orderBy('id', 'asc');

        // Determine the subdomain
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        // Check if the subdomain is 'global' and filter services accordingly
        if ($subdomain === 'global') {
            $query->where('is_global', true);
        }

        $services = $query->get();

        // Get the service categories
        $serviceCategoryQuery = ServiceCategory::orderBy('id', 'asc');
        if ($subdomain === 'global') {
            $serviceCategoryQuery->where('is_global', true);
        }
        $serviceCategories = $serviceCategoryQuery->get();

        return response()->json([
            'page' => $page,
            'services' => $services,
            'serviceCategories' => $serviceCategories,
        ]);
    }
}
