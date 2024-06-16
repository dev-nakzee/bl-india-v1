<?php

namespace App\Http\Controllers\cms;

use App\Models\ProductServiceMap;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductServiceMapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $productServiceMaps = ProductServiceMap::with(['product', 'service'])->get();
        return response()->json($productServiceMaps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'service_id' => 'required|exists:services,id',
            'is' => 'nullable|string',
            'group' => 'nullable|string',
            'scheme' => 'nullable|string',
            'others' => 'nullable|string',
            'is_mandatory' => 'required|boolean',
            'details' => 'nullable|string',
        ]);

        $productServiceMap = ProductServiceMap::create($validated);
        return response()->json($productServiceMap, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //
        $productServiceMap = ProductServiceMap::findOrFail($id);
        return response()->json($productServiceMap);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        //
        $validated = $request->validate([
            'product_id' => 'sometimes|required|exists:products,id',
            'service_id' => 'sometimes|required|exists:services,id',
            'is' => 'nullable|string',
            'group' => 'nullable|string',
            'scheme' => 'nullable|string',
            'others' => 'nullable|string',
            'is_mandatory' => 'sometimes|required|boolean',
            'details' => 'nullable|string',
        ]);

        $productServiceMap = ProductServiceMap::findOrFail($id);
        $productServiceMap->update($validated);
        return response()->json($productServiceMap, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        //
        $productServiceMap = ProductServiceMap::findOrFail($id);
        $productServiceMap->delete();
        return response()->json(null, 204);
    }
}
