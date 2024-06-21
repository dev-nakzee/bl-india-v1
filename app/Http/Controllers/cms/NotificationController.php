<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\Notification;
use App\Models\Product;
use App\Models\NoticeProductMap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        $notifications = Notification::orderBy('id', 'desc')->with('category')->get();
        return response()->json($notifications);
    }

    public function show($id): JsonResponse
    {
        $notification = Notification::with('category')->findOrFail($id);
        return response()->json($notification);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'notification_category_id' => 'required|exists:notification_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:notifications,slug',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'file_url' => 'nullable|file|mimes:pdf|max:2048', // max 2MB
            'content' => 'nullable|string',
            'date' => 'required|date', // Add validation rule for date
        ]);

        $data = $request->except('file_url');
        if ($request->hasFile('file_url')) {
            $filePath = $request->file('file_url')->store('notifications', 'public');
            $data['file_url'] = Storage::url($filePath);
        }

        $notification = Notification::create($data);
        return response()->json($notification, 201);
    }

    public function update1(Request $request, $id): JsonResponse
    {
        $notification = Notification::findOrFail($id);

        $request->validate([
            'notification_category_id' => 'required|exists:notification_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:notifications,slug,' . $id,
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'file_url' => 'nullable|file|mimes:pdf|max:2048', // max 2MB
            'content' => 'nullable|string',
            'date' => 'required|date', // Add validation rule for date
        ]);

        $data = $request->except('file_url');
        if ($request->hasFile('file_url')) {
            // Delete the old file if exists
            if ($notification->file_url) {
                $oldFilePath = str_replace('/storage/', '', $notification->file_url);
                Storage::disk('public')->delete($oldFilePath);
            }

            $filePath = $request->file('file_url')->store('notifications', 'public');
            $data['file_url'] = Storage::url($filePath);
        }

        $notification->update($data);
        return response()->json($notification);
    }

    public function destroy($id): JsonResponse
    {
        $notification = Notification::findOrFail($id);
        
        // Delete the associated file if exists
        if ($notification->file_url) {
            $filePath = str_replace('/storage/', '', $notification->file_url);
            Storage::disk('public')->delete($filePath);
        }

        $notification->delete();
        return response()->json(null, 204);
    }

    public function getProducts(string $id): JsonResponse
    {
        $notification = Notification::with('products')->findOrFail($id);
        $allProducts = Product::all(); // Fetch all products for attaching
        return response()->json(['notification' => $notification, 'allProducts' => $allProducts]);
    }

    public function attachProducts(Request $request, $id): JsonResponse
    {
        $notification = Notification::findOrFail($id);
        $productId = $request->product_id;

        try {
            $notification->products()->attach($productId);
            return response()->json(['message' => 'Product attached successfully']);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Product is already attached to this notification'], 400);
        }
    }

    public function detachProduct($notificationId, $productId): JsonResponse
    {
        $notification = Notification::findOrFail($notificationId);
        $notification->products()->detach($productId);
        return response()->json(['message' => 'Product detached successfully']);
    }
}