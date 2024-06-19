<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\Download;
use App\Models\DownloadFile;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function index()
    {
        $downloads = Download::with('category', 'files')->get();
        return response()->json($downloads);
    }

    public function show($id)
    {
        $download = Download::with('category', 'files')->findOrFail($id);
        return response()->json($download);
    }

    public function store(Request $request)
    {
        $request->validate([
            'download_category_id' => 'required|exists:download_categories,id',
            'name' => 'required|string|max:255',
        ]);

        $download = Download::create($request->all());
        return response()->json($download, 201);
    }

    public function update(Request $request, $id)
    {
        $download = Download::findOrFail($id);

        $request->validate([
            'download_category_id' => 'required|exists:download_categories,id',
            'name' => 'required|string|max:255',
        ]);

        $download->update($request->all());
        return response()->json($download);
    }

    public function destroy($id)
    {
        $download = Download::findOrFail($id);
        $download->delete();
        return response()->json(null, 204);
    }

    public function attachFile(Request $request, $downloadId)
    {
        return response()->json($request->file, 200);
        $request->validate([
            'name' => 'required|string|max:255',
            'file_url' => 'required|file|mimes:pdf',
        ]);

        $download = Download::findOrFail($downloadId);

        if ($request->hasFile('file_url')) {
            $filePath = $request->file('file_url')->store('notifications', 'public');
            $data['file_url'] = Storage::url($filePath);
        }
        if ($request->hasFile('file_url')) {
            $filePath = $request->file('file_url')->store('downloads');
            $file = new DownloadFile([
                'name' => $request->name,
                'file_url' => $filePath,
            ]);

            $download->files()->save($file);
        }

        return response()->json($file, 201);
    }

    public function detachFile($downloadId, $fileId)
    {
        $download = Download::findOrFail($downloadId);
        $file = $download->files()->findOrFail($fileId);
        $file->delete();

        return response()->json(null, 204);
    }
}

