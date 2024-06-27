<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Download;
use Illuminate\Http\JsonResponse;

class DownloadController extends Controller
{
    //
    public function download(): JsonResponse
    {
        $page = Page::where('slug', 'downloads')->first();
        $downloads = Download::with('category')->get();
        return response()->json([
            'page' => $page,
            'downloads' => $downloads
        ]);
    }
}
