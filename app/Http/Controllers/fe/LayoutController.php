<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sticker;
use App\Models\SocialMedia;
use App\Models\Contact;
use App\Models\ServiceCategory;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Holiday;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Stichoza\GoogleTranslate\GoogleTranslate;


class LayoutController extends Controller
{
    //
    public function topBar(): JsonResponse
    {
        $socialMedia = SocialMedia::all();
        $topMenu = [
            ['title' => 'About', 'url' => '/about'],
            ['title' => 'Services', 'url' => '/services'],
            ['title' => 'Notifications', 'url' => '/notifications'],
            ['title' => 'Downloads', 'url' => '/downloads'],
            ['title' => 'Gallery', 'url' => '/gallery'],
            ['title' => 'Career', 'url' => '/career'],
            ['title' => 'Blogs', 'url' => '/blogs'],
            ['title' => 'Contact', 'url' => '/contact'],

        ];
        return response()->json(['socialMedia' => $socialMedia, 'topMenu' => $topMenu]);
    }
    //
    public function footer(): JsonResponse
    {
        $contact = Contact::first();
        $socialMedia = SocialMedia::all();
        $service = ServiceCategory::all();
        $siteCert = Sticker::orderBy('id')->where('image_type','Site Certificate')->get();
        $companyCert = Sticker::orderBy('id')->where('image_type','Company Certificate')->get();
        $links = [
            ['title' => 'About', 'url' => '/about'],
            ['title' => 'Downloads', 'url' => '/downloads'],
            ['title' => 'Gallery', 'url' => '/gallery'],
            ['title' => 'Careers', 'url' => '/careers'],
            ['title' => 'Blogs', 'url' => '/blogs'],
            ['title' => 'Contact', 'url' => '/contact'],

        ];
        $important = [
            ['title' => 'Privacy Policy', 'url' => '/privacy-policy'],
            ['title' => 'Terms & Conditions', 'url' => '/terms-conditions'],
            ['title' => 'Website Disclaimer', 'url' => '/website-disclaimer'],
            ['title' => 'Knowledge Base', 'url' => '/knowledge-base'],
            ['title' => 'Holiday List', 'url' => '/holiday-list'],
        ];
        return response()->json(['contact' => $contact,'socialMedia' => $socialMedia, 'service' => $service, 'links' => $links, 'important' => $important, 'siteCert' => $siteCert, 'companyCert' => $companyCert]);
    }
    public function termsConditions(): JsonResponse
    {
        $page = Page::where('slug', 'terms-and-conditions')->first();
        $section = PageSection::where('slug','terms-and-conditions')->first();
        return response()->json(['page' => $page, 'section' => $section]);
    }

    public function privacyPolicy(): JsonResponse
    {
        $page = Page::where('slug', 'privacy-policy')->first();
        $section = PageSection::where('slug','privacy-policy')->first();
        return response()->json(['page' => $page,'section' => $section]);
    }

    public function websiteDisclaimer(): JsonResponse
    {
        $page = Page::where('slug', 'website-disclaimer')->first();
        $section = PageSection::where('slug','website-disclaimer')->first();
        return response()->json(['page' => $page,'section' => $section]);
    }

    public function holidayList(): JsonResponse
    {
        $page = Page::where('slug', 'list-of-holidays')->first();
        $holidays = Holiday::all();
        return response()->json(['page' => $page, 'holidays' => $holidays]);
    }
}
