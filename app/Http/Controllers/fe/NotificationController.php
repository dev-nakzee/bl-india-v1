<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Notification;
use App\Models\NotificationCategory;
use Illuminate\Http\JsonResponse;
use Stichoza\GoogleTranslate\GoogleTranslate;
use DOMDocument;

class NotificationController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }
    //
    public function notifications(): JsonResponse
    {
        $page = Page::where('slug', 'notifications')->get();
        $notifications = Notification::orderBy('date', 'desc')->with('category', 'products')->get();
        foreach ($notifications as $notification)
        {
            $notification->name = $this->translateText($notification->name);
            // $notification->content = $this->translator->translate($notification->content);
        }
        $categories = NotificationCategory::orderBy('id', 'asc')->get();
        return response()->json([
            'page' => $page,
            'notifications' => $notifications,
            'categories' => $categories,
        ]);
    }
    public function notificationDetails($categorySlug, $slug): JsonResponse
    {
        $notification = Notification::where('slug', $slug)->with('products')->first();
        return response()->json($notification);
    }

    private function translateText($text)
    {
        return $text ? $this->translator->translate($text) : '';
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html)) {
            return '';
        }

        $doc = new DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();

        $xpath = new \DOMXPath($doc);
        $textNodes = $xpath->query('//text()');

        foreach ($textNodes as $textNode) {
            $textNode->nodeValue = $this->translateText($textNode->nodeValue);
        }

        return $doc->saveHTML();
    }

}
