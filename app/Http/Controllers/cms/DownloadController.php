<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DownloadController extends Controller
{
    public function index(): JsonResponse
    {
        $downloads = Download::with('category')->get();
        return response()->json($downloads);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'download_category_id' => 'required|exists:download_categories,id',
            'name' => 'required|string|max:255',
        ]);

        $download = Download::create($validatedData);
        return response()->json($download, 201);
    }

    public function show($id): JsonResponse
    {
        $download = Download::with('category')->findOrFail($id);
        return response()->json($download);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $download = Download::findOrFail($id);

        $validatedData = $request->validate([
            'download_category_id' => 'required|exists:download_categories,id',
            'name' => 'required|string|max:255',
        ]);

        $download->update($validatedData);
        return response()->json($download);
    }

    public function destroy($id): JsonResponse
    {
        $download = Download::findOrFail($id);
        $download->delete();
        return response()->json(null, 204);
    }
}
