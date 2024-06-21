<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\NotificationCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = NotificationCategory::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:notification_categories',
            'description' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);

        $category = NotificationCategory::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(NotificationCategory $notificationCategory)
    {
        return response()->json($notificationCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NotificationCategory $notificationCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:notification_categories,slug,' . $notificationCategory->id,
            'description' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);

        $notificationCategory->update($request->all());
        return response()->json($notificationCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NotificationCategory $notificationCategory)
    {
        $notificationCategory->delete();
        return response()->json(null, 204);
    }
}

