<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class ImageController extends Controller
{
    //
    public function show($path)
    {
        return Cache::remember("{$path}", 60 * 24 * 7, function () use ($path) {
            if (Storage::disk('public')->exists($path)) {
                $optimizerChain = OptimizerChainFactory::create();
                $filePath = storage_path('app/public/' . $path);
                $optimizerChain->optimize($filePath);

                $file = Storage::disk('public')->get($path);
                $type = Storage::disk('public')->mimeType($path);

                return Response::make($file, 200)->header("Content-Type", $type);
            } else {
                abort(404);
            }
        });
    }
}
