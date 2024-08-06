<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\ServiceSection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $serviceSections = ServiceSection::with(['service'])->orderBy('id')->get();
        return response()->json($serviceSections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string',
            'tagline' => 'nullable|string',
            'content' => 'nullable|string',
            'is_global' => 'required|boolean',
        ]);

        $serviceSection = ServiceSection::create($validated);
        return response()->json($serviceSection, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $serviceSection = ServiceSection::with(['service'])->findOrFail($id);
        return response()->json($serviceSection);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $serviceSection = ServiceSection::findOrFail($id);

        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string',
            'tagline' => 'nullable|string',
            'content' => 'nullable|string',
            'is_global' => 'required|boolean',
        ]);

        $serviceSection->update($validated);
        return response()->json($serviceSection);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $serviceSection = ServiceSection::findOrFail($id);
        $serviceSection->delete();
        return response()->json(null, 204);
    }
}
