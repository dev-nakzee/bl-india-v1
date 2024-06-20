<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\DownloadFile;
use Illuminate\Http\Request;

class DownloadFileController extends Controller
{
    public function index($downloadId)
    {
        $files = DownloadFile::where('download_id', $downloadId)->get();
        return response()->json($files);
    }

    public function show($downloadId, $fileId)
    {
        $file = DownloadFile::where('download_id', $downloadId)->findOrFail($fileId);
        return response()->json($file);
    }
}