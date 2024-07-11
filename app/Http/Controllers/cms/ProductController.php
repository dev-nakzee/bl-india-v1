<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductServiceMap;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::with('categories', 'services')->orderBy('id', 'asc')->get();
        return response()->json($products);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products',
            'technical_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'product_category_ids' => 'required|json',
            'product_category_ids.*' => 'exists:product_categories,id',
        ]);

        if ($request->hasFile('image')) {
            try {
                $imageWebp = Image::make($request->file('image'))->encode('webp', 90);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'product_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $imageWebp);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'product_images/thumbnail/' . $imageName;
                $thumbnail = Image::make($request->file('image'))->resize(100, 100)->encode('webp', 90);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail);
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $product = Product::create($validated);

        // Sync categories
        $product->categories()->sync($validated['category_ids']);

        return response()->json($product->load('categories'), 201);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::with('categories', 'services')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:products,slug,' . $id,
            'technical_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'product_category_ids' => 'required|json',
            // 'product_category_ids.*' => 'exists:product_categories,id',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            try {
                // Delete the old image if exists
                if ($product->image_url) {
                    Storage::disk('public')->delete($product->image_url);
                    Storage::disk('public')->delete($product->thumbnail_url);
                }

                $imageWebp = Image::make($request->file('image'))->encode('webp', 90);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'product_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $imageWebp);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'product_images/thumbnail/' . $imageName;
                $thumbnail = Image::make($request->file('image'))->resize(100, 100)->encode('webp', 90);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail);
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $product->update($validated);
        $category_ids = json_decode($validated['product_category_ids'], true);
        // Sync categories
        $product->categories()->sync($category_ids);

        return response()->json($product->load('categories'), 202);
    }

    public function destroy(string $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        // Delete the image if exists
        if ($product->image_url) {
            Storage::disk('public')->delete($product->image_url);
            Storage::disk('public')->delete($product->thumbnail_url);
        }

        $product->delete();
        return response()->json(null, 204);
    }

    public function attachServices(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'services' => 'required|array',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.is' => 'nullable|string',
            'services.*.group' => 'nullable|string',
            'services.*.scheme' => 'nullable|string',
            'services.*.others' => 'nullable|string',
            'services.*.is_mandatory' => 'required|boolean',
            'services.*.details' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);

        foreach ($validated['services'] as $service) {
            ProductServiceMap::create([
                'product_id' => $product->id,
                'service_id' => $service['service_id'],
                'is' => $service['is'],
                'group' => $service['group'],
                'scheme' => $service['scheme'],
                'others' => $service['others'],
                'is_mandatory' => $service['is_mandatory'],
                'details' => $service['details'],
            ]);
        }

        return response()->json(['message' => 'Services attached successfully'], 201);
    }

    public function detachService(string $productId, string $serviceId): JsonResponse
    {
        $productServiceMap = ProductServiceMap::where('product_id', $productId)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $productServiceMap->delete();

        return response()->json(['message' => 'Service detached successfully'], 204);
    }

    public function getServices(string $id): JsonResponse
    {
        $productServices = ProductServiceMap::with('service')->where('product_id', $id)->get();
        return response()->json($productServices);
    }

    public function updateService(Request $request, string $productId, string $serviceId): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'is' => 'nullable|string',
            'group' => 'nullable|string',
            'scheme' => 'nullable|string',
            'others' => 'nullable|string',
            'is_mandatory' => 'required|boolean',
            'details' => 'nullable|string',
        ]);

        $productServiceMap = ProductServiceMap::where('product_id', $productId)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $productServiceMap->update($validated);

        return response()->json(['message' => 'Service updated successfully'], 200);
    }
}
