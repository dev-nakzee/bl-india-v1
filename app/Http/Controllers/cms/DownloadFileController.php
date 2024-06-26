<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\DownloadFile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DownloadFileController extends Controller
{
    public function index($downloadId): JsonResponse
    {
        $downloadFiles = DownloadFile::where('download_id', $downloadId)->with('download')->get();
        return response()->json($downloadFiles);
    }

    public function store(Request $request, $downloadId): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480',
        ]);

        $filePath = $request->file('file')->store('public/download_files');

        $downloadFile = DownloadFile::create([
            'download_id' => $downloadId,
            'name' => $request->name,
            'file_url' => Storage::url($filePath),
        ]);

        return response()->json($downloadFile, 201);
    }

    public function show($downloadId, $fileId): JsonResponse
    {
        $downloadFile = DownloadFile::where('download_id', $downloadId)->findOrFail($fileId);
        return response()->json($downloadFile);
    }

    public function update(Request $request, $downloadId, $fileId): JsonResponse
    {
        $downloadFile = DownloadFile::where('download_id', $downloadId)->findOrFail($fileId);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'file' => 'sometimes|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480',
        ]);

        if ($request->hasFile('file')) {
            Storage::delete(str_replace('/storage/', 'public/', $downloadFile->file_url));
            $filePath = $request->file('file')->store('public/download_files');
            $downloadFile->file_url = Storage::url($filePath);
        }

        $downloadFile->update($request->only(['name', 'file_url']));

        return response()->json($downloadFile);
    }

    public function destroy($downloadId, $fileId): JsonResponse
    {
        $downloadFile = DownloadFile::where('download_id', $downloadId)->findOrFail($fileId);
        Storage::delete(str_replace('/storage/', 'public/', $downloadFile->file_url));
        $downloadFile->delete();

        return response()->json(null, 204);
    }
}
