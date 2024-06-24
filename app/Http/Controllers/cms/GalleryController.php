<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $galleries = Gallery::all();
        return response()->json($galleries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'title' =>'required|string|max:255',
            'description' =>'nullable|string',
            'image' =>'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' =>'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'gallery_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $gallery = Gallery::create($validated);

        return response()->json($gallery, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //
        $gallery = Gallery::findOrFail($id);
        return response()->json($gallery);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, string $id): JsonResponse
    {
        //
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'title' =>'required|string|max:255',
            'description' =>'nullable|string',
            'image' =>'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' =>'nullable|string|max:255',
        ]);
        if ($request->hasFile('image')) {
            if ($gallery->image_url) {
                Storage::disk('public')->delete($gallery->image_url);
            }
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'gallery_images/'. $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: '. $e->getMessage()], 500);
            }
        }
        $gallery->update($validated);
        return response()->json($gallery, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        //
        $gallery = Gallery::findOrFail($id);

        if ($gallery->image_url) {
            Storage::disk('public')->delete($gallery->image_url);
        }

        $gallery->delete();

        return response()->json(null, 204);
    }
}
