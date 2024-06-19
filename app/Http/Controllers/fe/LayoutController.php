<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sticker;
use App\Models\SocialMedia;
use App\Models\Contact;
use App\Models\ServiceCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Stichoza\GoogleTranslate\GoogleTranslate;


class LayoutController extends Controller
{
    //
    public function social(): JsonResponse
    {
        $socialMedia = SocialMedia::all();
        return response()->json($socialMedia);
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
            ['title' => 'Blog', 'url' => '/blog'],
            ['title' => 'Contact', 'url' => '/contact'],
            ['title' => 'Careers', 'url' => '/careers'],
            ['title' => 'Downloads', 'url' => '/downloads'],
            ['title' => 'Gallery', 'url' => '/gallery'],
        ];
        $important = [
            ['title' => 'Privacy Policy', 'url' => '/privacy-policy'],
            ['title' => 'Terms & Conditions', 'url' => '/terms-conditions'],
            ['title' => 'Knowledge Base', 'url' => '/knowledge-base']
        ];
        return response()->json(['contact' => $contact,'socialMedia' => $socialMedia, 'service' => $service, 'links' => $links, 'important' => $important, 'siteCert' => $siteCert, 'companyCert' => $companyCert]);
    }
}
