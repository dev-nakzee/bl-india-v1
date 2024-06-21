<?php
namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $services = Service::with('serviceCategory')->get();
        return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services',
            'tagline' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'is_global' => 'required|boolean',
            'service_category_id' => 'required|exists:service_categories,id',
        ]);

        if ($request->hasFile('image')) {
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'service_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'service_images/thumbnail/' . $imageName;
                $thumbnail = $imageWebp->resize(100, 100);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail->toWebp(100));
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:services,slug,' . $id,
            'tagline' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'is_global' => 'sometimes|required|boolean',
            'service_category_id' => 'sometimes|required|exists:service_categories,id',
        ]);

        $service = Service::findOrFail($id);

        if ($request->hasFile('image')) {
            try {
                // Delete the old image if exists
                if ($service->image_url) {
                    Storage::disk('public')->delete($service->image_url);
                }
                if ($service->thumbnail_url) {
                    Storage::disk('public')->delete($service->thumbnail_url);
                }

                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'service_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'service_images/thumbnail/' . $imageName;
                $thumbnail = $imageWebp->resize(100, 100);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail->toWebp(100));
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $service->update($validated);

        return response()->json($service, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $service = Service::findOrFail($id);

        // Delete the image if exists
        if ($service->image_url) {
            Storage::disk('public')->delete($service->image_url);
            Storage::disk('public')->delete($service->thumbnail_url);
        }

        $service->delete();

        return response()->json(null, 204);
    }
}
