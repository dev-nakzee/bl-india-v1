<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Sticker;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class StickerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $stickers = Sticker::all();
        return response()->json($stickers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'required|string|max:255',
            'image_type' => 'required|in:Associate,Site Certificate,Company Certificate',
        ]);

        if ($request->hasFile('image')) {
            $imageWebp  = Image::read($request->file('image'));
            $image = $imageWebp->toWebp(100);
            $imageName = uniqid().'.webp';

            // Convert and store original image as WebP
            $imagePath = 'sticker_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $image);
            $validated['image_url'] = Storage::url($imagePath);
        }

        $sticker = Sticker::create($validated);
        return response()->json($sticker, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $sticker = Sticker::findOrFail($id);
        return response()->json($sticker);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'sometimes|required|string|max:255',
            'image_type' => 'sometimes|required|in:Associate,Site Certificate,Company Certificate',
        ]);

        $sticker = Sticker::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if exists
            if ($service->image_url) {
                Storage::disk('public')->delete($service->image_url);
            }

            $imageWebp  = Image::read($request->file('image'));
            $image = $imageWebp->toWebp(100);
            $imageName = uniqid().'.webp';

            // Convert and store original image as WebP
            $imagePath = 'sticker_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $image);
            $validated['image_url'] = Storage::url($imagePath);
        }

        $sticker->update($validated);
        return response()->json($sticker, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $sticker = Sticker::findOrFail($id);

        // Delete the image if exists
        if ($sticker->image_url) {
            Storage::disk('public')->delete($sticker->image_url);
        }

        $sticker->delete();
        return response()->json(null, 204);
    }
}
