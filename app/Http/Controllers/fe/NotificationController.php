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
     * Preload all translations for notifications.
     */
    public function preloadTranslations(): void
    {
        $notifications = Notification::all();
        $notificationCategories = NotificationCategory::all();

        foreach ($this->languages as $locale) {
            $this->translator->setTarget($locale);

            // Preload translations for notifications
            foreach ($notifications as $notification) {
                $this->translateText($notification->name);
                $this->translateHtmlContent($notification->content);
                $this->translateText($notification->technical_name);
            }

            // Preload translations for notification categories
            foreach ($notificationCategories as $category) {
                $this->translateText($category->name);
            }
        }
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

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

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

        return $this->translator->translate($text);
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
