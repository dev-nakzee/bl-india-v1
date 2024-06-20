<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $customers = Customer::all();
        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imageWebp  = Image::make($request->file('image'))->encode('webp', 100);
            $imageName = uniqid() . '.webp';

            // Convert and store original image as WebP
            $imagePath = 'customer_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $imageWebp);
            $validated['image_url'] = Storage::url($imagePath);
        }

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, string $id): JsonResponse
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
        ]);

        $customer = Customer::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if exists
            if ($customer->image_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $customer->image_url));
            }

            $imageWebp  = Image::make($request->file('image'))->encode('webp', 100);
            $imageName = uniqid() . '.webp';

            // Convert and store original image as WebP
            $imagePath = 'customer_images/' . $imageName;
            Storage::disk('public')->put($imagePath, (string) $imageWebp);
            $validated['image_url'] = Storage::url($imagePath);
        }

        $customer->update($validated);
        return response()->json($customer, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse 
    {
        //
        $customer = Customer::findOrFail($id);

        // Delete the image if exists
        if ($customer->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $customer->image_url));
        }

        $customer->delete();
        return response()->json(null, 204);
    }
}
