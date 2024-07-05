<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\DownloadCategory;
use App\Models\Download;
use Illuminate\Http\JsonResponse;

class DownloadController extends Controller
{
    //
    public function download(): JsonResponse
    {
        $page = Page::where('slug', 'downloads')->first();
        $downloadCategories = DownloadCategory::orderBy('id', 'asc')->get();
        $downloads = Download::with('category', 'files')->get();
        foreach ($downloads as $download) {
            $download->name = $this->translateText($download->name);
            foreach ($download->files as $file)
            {
                $file->name = $this->translateText($file->name);
            }
        }
        return response()->json([
            'page' => $page,
            'downloadCategories' => $downloadCategories,
            'downloads' => $downloads
        ]);
    }
}
