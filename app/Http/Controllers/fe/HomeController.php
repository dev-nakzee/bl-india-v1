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
    protected $translator;

    public function __construct()
    {
        $locale = session()->get('locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }
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
        $banner = PageSection::where('page_id', 1)->where('slug', 'home-banner')->get();
        if ($banner->isNotEmpty()) {
            $banner[0]->title = $this->translator->translate($banner[0]->title);
            $banner[0]->tag_line = $this->translator->translate($banner[0]->tag_line);
        }
      
        return response()->json([session()->get('locale'), $banner]);
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
