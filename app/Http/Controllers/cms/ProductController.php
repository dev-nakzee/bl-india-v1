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
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $products = Product::with('productCategory', 'services')->orderBy('id', 'desc')->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
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
            'product_category_id' => 'required|exists:product_categories,id',
        ]);

        if ($request->hasFile('image')) {
            try {
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'product_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'product_images/thumbnail/' . $imageName;
                $thumbnail = $imageWebp->resize(100, 100);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail->toWebp(100));
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, string $id): JsonResponse
    {
        //
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
            'product_category_id' => 'sometimes|required|exists:product_categories,id',
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('image')) {
            try {
                // Delete the old image if exists
                if ($product->image_url) {
                    Storage::disk('public')->delete($product->image_url);
                    Storage::disk('public')->delete($product->thumbnail_url);
                }

                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'product_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

                // Generate and store thumbnail as WebP
                $thumbnailPath = 'product_images/thumbnail/' . $imageName;
                $thumbnail = $imageWebp->resize(100, 100);
                Storage::disk('public')->put($thumbnailPath, (string) $thumbnail->toWebp(100));
                $validated['thumbnail_url'] = Storage::url($thumbnailPath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

        $product->update($validated);
        return response()->json($product, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        //
        $product = Product::findOrFail($id);

        // Delete the image if exists
        if ($product->image_url) {
            Storage::disk('public')->delete($product->image_url);
            Storage::disk('public')->delete($product->thumbnail_url);
        }

        $product->delete();
        return response()->json(null, 204);
    }


    /**
     * Attach services to a product.
     */
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

    /**
     * Detach a service from a product.
     */
    public function detachService(string $productId, string $serviceId): JsonResponse
    {
        $productServiceMap = ProductServiceMap::where('product_id', $productId)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $productServiceMap->delete();

        return response()->json(['message' => 'Service detached successfully'], 204);
    }

    /**
     * Get services related to a product.
     */
    public function getServices(string $id): JsonResponse
    {
        $productServices = ProductServiceMap::with('service')->where('product_id', $id)->get();
        return response()->json($productServices);
    }
}
