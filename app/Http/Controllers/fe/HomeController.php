<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Service;
use App\Models\Process;
use App\Models\Blog;
use App\Models\Testimonial;
use App\Models\Sticker;
use Illuminate\Http\JsonResponse;
use Stichoza\GoogleTranslate\GoogleTranslate;

class HomeController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
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
            $banner[0]->content = $this->translator->translate($banner[0]->content);
        }
        return response()->json($banner);
    }

    /**
     * Handle the Home Services request.
     */
    public function services(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-services')->get();
        $services = Service::with('serviceCategory')->orderBy('id')->limit(4)->get();
        foreach ($services as $service) {
            $service->description = $this->translator->translate($service->description);
        }
        return response()->json(['section' => $section, 'services' => $services]);
    }

    public function about(): JsonResponse
    {
        $sections = PageSection::where('page_id', 1)->where('slug', 'home-about')->get();
        foreach ($sections as $section) {
            $section->title = $this->translator->translate($section->title);
            $section->tag_line = $this->translator->translate($section->tag_line);
            $section->content = $this->translator->translate($section->content);
        }
        return response()->json(['section' => $sections]);
    }

    public function brochure(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-brochure')->get();
        $services = Service::orderBy('id')->get();
        return response()->json(['section' => $section, 'services' => $services]);
    }

    public function process(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-process')->get();
        $processes = Process::orderBy('id')->get();
        foreach ($processes as $process) {
            $process->title = $this->translator->translate($process->title);
            $process->content = $this->translator->translate($process->content);
        }
        return response()->json(['section' => $section, 'processes' => $processes]);
    }

    public function blog(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-blog')->get();
        $blogs = Blog::orderBy('id', 'desc')->with('blogCategory')->limit(3)->get();
        foreach ($blogs as $blog) {
            $blog->title = $this->translator->translate($blog->title);
            $blog->content = $this->translator->translate(mb_strimwidth($this->getFirstParagraphContent($blog->content), 0, 250, '...'));
        }
        return response()->json(['section' => $section, 'blogs' => $blogs]);
    }

    public function testimonial(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-testimonial')->get();
        $testimonials = Testimonial::orderBy('id', 'desc')->limit(3)->get();
        return response()->json(['section' => $section, 'testimonials' => $testimonials]);
    }

    public function associates(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-associates')->get();
        $associates = Sticker::orderBy('id')->where('image_type','Associate')->get();
        return response()->json(['section' => $section, 'associates' => $associates]);
    }

    protected function getFirstParagraphContent(string $html): ?string
    {
        $dom = new \DOMDocument();
        // Suppress warnings from malformed HTML
        @$dom->loadHTML('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' . $html);
        
        $paragraphs = $dom->getElementsByTagName('p');
        if ($paragraphs->length > 0) {
            return $paragraphs->item(0)->textContent;
        }

        return null;
    }
}
