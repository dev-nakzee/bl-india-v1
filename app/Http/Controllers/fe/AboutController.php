<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Team;
use App\Models\Customer;
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

    public function visionMission(): JsonResponse
    {
        $section = PageSection::where('slug', 'vision-mission')->first();
        return response()->json($section);
    }
    public function team(): JsonResponse
    {
        $section = PageSection::where('slug', 'about-team')->first();
        $team = Team::orderBy('order')->all();
        return response()->json($section);
    }
}
