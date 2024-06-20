<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    //
    public function about(): JsonResponse
    {
        $page = Page::where('slug', 'about')->first();
        return response()->json($page);
    }

    public function main(): JsonResponse
    {
        $section = PageSection::where('slug', 'about-main')->first();
        return response()->json($section);
    }
}
