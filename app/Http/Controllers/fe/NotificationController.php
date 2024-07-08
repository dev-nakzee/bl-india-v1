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
use Illuminate\Support\Facades\Cache;

class NotificationController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }

    public function notifications(): JsonResponse
    {
        $page = Page::where('slug', 'notifications')->get();
        $notifications = Notification::orderBy('date', 'desc')->with('category', 'products')->get();
        foreach ($notifications as $notification) {
            $notification->name = $this->translateText($notification->name);
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
        $notification->name = $this->translateText($notification->name);
        $notification->content = $this->translateHtmlContent($notification->content);
        $notification->technical_name = $this->translateText($notification->technical_name);
        return response()->json($notification);
    }

    private function translateText($text)
    {
        if (is_null($text)) {
            return '';
        }

        $cacheKey = 'translated_text_' . md5($text);
        return Cache::remember($cacheKey, 60 * 60 * 24, function () use ($text) {
            return $this->translator->translate($text);
        });
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html)) {
            return '';
        }

        $cacheKey = 'translated_html_' . md5($html);
        return Cache::remember($cacheKey, 60 * 60 * 24, function () use ($html) {
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
        });
    }
}
