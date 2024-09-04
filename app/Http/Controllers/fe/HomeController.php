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
    protected $locale;
    protected $languages = [
        'en', 'fr', 'es', 'it', 'zh-Hans', 'zh-Hant', 'de', 'ar', 'ja', 'ko', 'ru', 
        'ms', 'vi', 'th', 'pl', 'pt', 'hi', 'mr', 'bn', 'te', 'ta', 'kn', 'ml', 'gu', 'pa'
    ];

    public function __construct(Request $request)
    {
        $this->locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($this->locale);
    }

    /**
     * Preload translations into the cache (if needed later).
     */
    public function preloadTranslations(): void
    {
        $sections = PageSection::where('page_id', 1)->get();
        $services = Service::with('serviceCategory')->get();
        $processes = Process::get();
        $blogs = Blog::get();

        foreach ($this->languages as $locale) {
            if ($locale == 'en') {
                continue; // Skip translation for English
            }

            $this->translator->setTarget($locale);
            
            // Preload translations for sections
            foreach ($sections as $section) {
                $this->translateText($section->title);
                $this->translateText($section->tag_line);
                $this->translateText($section->content);
            }

            // Preload translations for services
            foreach ($services as $service) {
                $this->translateText($service->tagline);
                $this->translateText($service->description);
            }

            // Preload translations for processes
            foreach ($processes as $process) {
                $this->translateText($process->name);
                $this->translateText($process->text);
            }

            // Preload translations for blogs
            foreach ($blogs as $blog) {
                $this->translateText($blog->name);
                $this->translateText($this->getFirstParagraphContent($blog->content));
            }
        }
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
            $banner[0]->title = $this->translateText($banner[0]->title);
            $banner[0]->tag_line = $this->translateText($banner[0]->tag_line);
            $banner[0]->content = $this->translateText($banner[0]->content);
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

        $translations = $this->bulkTranslate([
            'taglines' => $services->pluck('tagline')->toArray(),
            'descriptions' => $services->pluck('description')->toArray(),
        ]);

        foreach ($services as $index => $service) {
            $service->tagline = $translations['taglines'][$index];
            $service->description = $translations['descriptions'][$index];
        }

        return response()->json(['section' => $section, 'services' => $services]);
    }

    public function about(): JsonResponse
    {
        $sections = PageSection::where('page_id', 1)->where('slug', 'home-about')->get();
        foreach ($sections as $section) {
            $section->title = $this->translateText($section->title);
            $section->tag_line = $this->translateText($section->tag_line);
            $section->content = $this->translateText($section->content);
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

        $translations = $this->bulkTranslate([
            'titles' => $processes->pluck('name')->toArray(),
            'contents' => $processes->pluck('text')->toArray(),
        ]);

        foreach ($processes as $index => $process) {
            $process->title = $translations['titles'][$index];
            $process->content = $translations['contents'][$index];
        }

        return response()->json(['section' => $section, 'processes' => $processes]);
    }

    public function blog(): JsonResponse
    {
        $section = PageSection::where('page_id', 1)->where('slug', 'home-blog')->get();
        $blogs = Blog::orderBy('id', 'desc')->with('blogCategory')->limit(3)->get();

        $translations = $this->bulkTranslate([
            'titles' => $blogs->pluck('name')->toArray(),
            'contents' => $blogs->pluck('content')->map(function($content) {
                return mb_strimwidth($this->getFirstParagraphContent($content), 0, 250, '...');
            })->toArray(),
        ]);

        foreach ($blogs as $index => $blog) {
            $blog->title = $translations['titles'][$index];
            $blog->content = $translations['contents'][$index];
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
        $associates = Sticker::orderBy('id')->where('image_type', 'Associate')->get();
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

    private function bulkTranslate($texts)
    {
        $translations = [];

        foreach ($texts as $key => $textArray) {
            $translations[$key] = array_map(function ($text) {
                return $this->translateText($text);
            }, $textArray);
        }

        return $translations;
    }

    private function translateText($text)
    {
        if (is_null($text) || $this->locale === 'en') {
            return $text; // Skip translation if locale is English or text is null
        }

        return $this->translator->translate($text);
    }
}
