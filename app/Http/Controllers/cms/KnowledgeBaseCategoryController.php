<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBaseCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class KnowledgeBaseCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $categories = KnowledgeBaseCategory::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' =>'required|string|max:255',
            'slug' =>'required|string|max:255|unique:knowledge_base_categories',
            'image' =>'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' =>'nullable|string|max:255',
            'is_featured' => 'required',
        ]);

        if ($request->hasFile('image')) {
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'knowledge_base_categories_images/'. $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: '. $e->getMessage()], 500);
            }
        }
        $category = KnowledgeBaseCategory::create($validated);
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $category = KnowledgeBaseCategory::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        //
        $category = KnowledgeBaseCategory::findOrFail($id);

        $validated = $request->validate([
            'name' =>'required|string|max:255',
            'image' =>'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' =>'nullable|string|max:255',
            'is_featured' => 'required',
        ]);
        if ($request->hasFile('image')) {
            if ($category->image_url) {
                Storage::disk('public')->delete($category->image_url);
            }
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'knowledge_base_categories_images/'. $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: '. $e->getMessage()], 500);
            }
        }
        $category->update($validated);
        return response()->json($category, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        //
        $category = KnowledgeBaseCategory::findOrFail($id);

        if ($category->image_url) {
            Storage::disk('public')->delete($category->image_url);
        }

        $category->delete();

        return response()->json(null, 204);
    }
}
