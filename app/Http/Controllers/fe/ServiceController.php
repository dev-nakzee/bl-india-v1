<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function services(Request $request, $subdomain = null): JsonResponse
    {
        $query = Service::orderBy('id', 'asc');

        // Check if the subdomain is 'global' and filter services accordingly
        if ($subdomain === 'global') {
            $query->where('is_global', true);
        }

        $services = $query->get();

        // Get the service categories
        $serviceCategories = ServiceCategory::all();

        return response()->json([
           'services' => $services,
           'serviceCategories' => $serviceCategories,
        ]);
    }
}
