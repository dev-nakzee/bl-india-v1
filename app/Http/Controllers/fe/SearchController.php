<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    //
     /**
     * Handle the search request.
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');

        // Search services
        $services = Service::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        // Search products
        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        return response()->json([
            'services' => $services,
            'products' => $products,
        ]);
    }
}
