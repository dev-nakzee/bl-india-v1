<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\DownloadCategory;
use Illuminate\Http\Request;

class DownloadCategoryController extends Controller
{
    public function index()
    {
        $categories = DownloadCategory::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = DownloadCategory::findOrFail($id);
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:download_categories,slug',
            'description' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);

        $category = DownloadCategory::create($request->all());
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = DownloadCategory::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:download_categories,slug,' . $id,
            'description' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);

        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = DownloadCategory::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
