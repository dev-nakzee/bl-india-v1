<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Service;
use App\Models\Blog;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Stichoza\GoogleTranslate\GoogleTranslate;

class HomeController extends Controller
{
     /**
     * Handle the home request.
     */
    public function home(): JsonResponse
    {
        $home = Page::where('slug', 'home')->get();
        return response()->json($home);
    }

    /**
     * Handle the Home Banner request.
     */
    public function banner(): JsonResponse
    {
        // $translator = new GoogleTranslate(session()->get('locale'));
        $banner = PageSection::where('page_id', 1)->where('slug', 'home-banner')->get();
        // $banner['title'] = $translator->translate($banner['title']);
        // $banner['tag_line'] = $translator->translate($banner['subtitle']);
        return response()->json([$banner]);
    }

    /**
     * Handle the Home Services request.
     */
    public function services(): JsonResponse
    {
        // $translator = new GoogleTranslate(session()->get('locale'));
        $section = PageSection::where('page_id', 1)->where('slug', 'home-services')->get();
        $services = Service::with('serviceCategory')->orderBy('id')->limit(4)->get();
        return response()->json(['section' => $section, 'services' => $services]);
    }

    public function about(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-about')->get();
        return response()->json(['section' => $section]);
    }

    public function brochure(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-brochure')->get();
        $services = Service::orderBy('id')->get();
        return response()->json(['section' => $section, 'services' => $services]);
    }
}
