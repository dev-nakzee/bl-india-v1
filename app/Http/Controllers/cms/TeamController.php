<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $teams = Team::all();
        return response()->json($teams);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $imageWebp  = Image::read($request->file('image'));
            $image = $imageWebp->toWebp(100);
            $imageName = uniqid().'.webp';

            // Convert and store original image as WebP
            $imagePath = 'team_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $image);
            $validated['image_url'] = Storage::url($imagePath);
        }


        $team = Team::create($validated);
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $team = Team::findOrFail($id);
        return response()->json($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $team = Team::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if exists
            if ($team->image_url) {
                Storage::disk('public')->delete($team->image_url);
            }

            $imageWebp  = Image::read($request->file('image'));
            $image = $imageWebp->toWebp(100);
            $imageName = uniqid().'.webp';

            // Convert and store original image as WebP
            $imagePath = 'team_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $image);
            $validated['image_url'] = Storage::url($imagePath);
        }

        $team->update($validated);
        return response()->json($team, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $team = Team::findOrFail($id);

        // Delete the image if exists
        if ($team->image_url) {
            Storage::disk('public')->delete($team->image_url);
        }

        $team->delete();
        return response()->json(null, 204);
    }
}
