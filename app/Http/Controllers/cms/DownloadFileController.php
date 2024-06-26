<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\DownloadFile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DownloadFileController extends Controller
{
    public function index(): JsonResponse
    {
        $downloadFiles = DownloadFile::with('download')->get();
        return response()->json($downloadFiles);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'download_id' => 'required|exists:downloads,id',
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:2048',
        ]);

        $filePath = $request->file('file')->store('public/download_files');

        $downloadFile = DownloadFile::create([
            'download_id' => $request->download_id,
            'name' => $request->name,
            'file_url' => Storage::url($filePath),
        ]);

        return response()->json($downloadFile, 201);
    }

    public function show($id): JsonResponse
    {
        $downloadFile = DownloadFile::with('download')->findOrFail($id);
        return response()->json($downloadFile);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $downloadFile = DownloadFile::findOrFail($id);

        $request->validate([
            'download_id' => 'required|exists:downloads,id',
            'name' => 'sometimes|string|max:255',
            'file' => 'sometimes|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:2048',
        ]);

        if ($request->hasFile('file')) {
            Storage::delete(str_replace('/storage/', 'public/', $downloadFile->file_url));
            $filePath = $request->file('file')->store('public/download_files');
            $downloadFile->file_url = Storage::url($filePath);
        }

        $downloadFile->update($request->only(['download_id', 'name', 'file_url']));

        return response()->json($downloadFile);
    }

    public function destroy($id): JsonResponse
    {
        $downloadFile = DownloadFile::findOrFail($id);
        Storage::delete(str_replace('/storage/', 'public/', $downloadFile->file_url));
        $downloadFile->delete();

        return response()->json(null, 204);
    }
}