<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery;

class GalleryController extends Controller
{
    //
    public function gallery()
    {
        $galleries = Gallery::orderBy('id', 'desc')->get();
        return response()->json($galleries);
    }
}
