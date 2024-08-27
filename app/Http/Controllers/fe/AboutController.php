<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Team;
use App\Models\Customer;
use Stichoza\GoogleTranslate\GoogleTranslate;

class AboutController extends Controller
{
    protected $translator;
    protected $languages = [
        'en', 'fr', 'es', 'it', 'zh-Hans', 'zh-Hant', 'de', 'ar', 'ja', 'ko', 'ru', 
        'ms', 'vi', 'th', 'pl', 'pt', 'hi', 'mr', 'bn', 'te', 'ta', 'kn', 'ml', 'gu', 'pa'
    ];

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }

    /**
     * Preload translations into memory or cache.
     */
    public function preloadTranslations(): void
    {
        $page = Page::where('slug', 'about')->first();
        $sections = PageSection::whereIn('slug', ['about-main', 'vision-mission', 'our-team', 'founder-voice', 'our-clients'])->get();
        $team = Team::orderBy('order')->get();
        $customers = Customer::all();

        foreach ($this->languages as $locale) {
            $this->translator->setTarget($locale);
            
            // Preload translations for the about page
            if ($page) {
                $this->translateText($page->title);
                $this->translateText($page->content);
            }

            // Preload translations for sections
            foreach ($sections as $section) {
                $this->translateText($section->title);
                $this->translateText($section->content);
            }

            // Preload translations for team members
            foreach ($team as $member) {
                $this->translateText($member->name);
                $this->translateText($member->position);
                $this->translateText($member->bio);
            }

            // Preload translations for customers
            foreach ($customers as $customer) {
                $this->translateText($customer->name);
                $this->translateText($customer->description);
            }
        }
    }

    public function about(): JsonResponse
    {
        $page = Page::where('slug', 'about')->first();
        if ($page) {
            $page->title = $this->translateText($page->title);
            $page->content = $this->translateText($page->content);
        }
        return response()->json($page);
    }

    public function main(): JsonResponse
    {
        $section = PageSection::where('slug', 'about-main')->first();
        if ($section) {
            $section->title = $this->translateText($section->title);
            $section->content = $this->translateText($section->content);
        }
        return response()->json($section);
    }

    public function visionMission(): JsonResponse
    {
        $section = PageSection::where('slug', 'vision-mission')->first();
        if ($section) {
            $section->title = $this->translateText($section->title);
            $section->content = $this->translateText($section->content);
        }
        return response()->json($section);
    }

    public function team(): JsonResponse
    {
        $section = PageSection::where('slug', 'our-team')->first();
        $team = Team::orderBy('order')->get();

        if ($section) {
            $section->title = $this->translateText($section->title);
            $section->content = $this->translateText($section->content);
        }

        foreach ($team as $member) {
            $member->name = $this->translateText($member->name);
            $member->position = $this->translateText($member->position);
            $member->bio = $this->translateText($member->bio);
        }

        return response()->json(['section' => $section, 'team' => $team]);
    }

    public function founder(): JsonResponse
    {
        $section = PageSection::where('slug', 'founder-voice')->first();
        if ($section) {
            $section->title = $this->translateText($section->title);
            $section->content = $this->translateText($section->content);
        }
        return response()->json($section);
    }

    public function clients(): JsonResponse
    {
        $section = PageSection::where('slug', 'our-clients')->first();
        $customers = Customer::all();

        if ($section) {
            $section->title = $this->translateText($section->title);
            $section->content = $this->translateText($section->content);
        }

        foreach ($customers as $customer) {
            $customer->name = $this->translateText($customer->name);
            $customer->description = $this->translateText($customer->description);
        }

        return response()->json(['section' => $section, 'customers' => $customers]);
    }

    private function translateText($text)
    {
        if (is_null($text)) {
            return '';
        }

        return $this->translator->translate($text);
    }
}
