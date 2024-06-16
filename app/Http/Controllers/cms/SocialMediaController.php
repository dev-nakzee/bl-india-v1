<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SocialMediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $socialMedia = SocialMedia::all();
        return response()->json($socialMedia);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $socialMedia = SocialMedia::create($validated);
        return response()->json($socialMedia, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $socialMedia = SocialMedia::findOrFail($id);
        return response()->json($socialMedia);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|url|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $socialMedia = SocialMedia::findOrFail($id);
        $socialMedia->update($validated);

        return response()->json($socialMedia, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $socialMedia = SocialMedia::findOrFail($id);
        $socialMedia->delete();

        return response()->json(null, 204);
    }
}
