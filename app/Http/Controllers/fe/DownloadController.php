<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\DownloadCategory;
use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Stichoza\GoogleTranslate\GoogleTranslate;
use DOMDocument;
use Illuminate\Support\Facades\Cache;

class DownloadController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }

    public function download(): JsonResponse
    {
        $page = Page::where('slug', 'downloads')->first();
        $downloadCategories = DownloadCategory::orderBy('id', 'asc')->get();
        $downloads = Download::with('category', 'files')->get();
        foreach ($downloads as $download) {
            $download->name = $this->translateText($download->name);
            foreach ($download->files as $file) {
                $file->name = $this->translateText($file->name);
            }
        }
        return response()->json([
            'page' => $page,
            'downloadCategories' => $downloadCategories,
            'downloads' => $downloads
        ]);
    }

    private function translateText($text)
    {
        if (is_null($text)) {
            return '';
        }

        $cacheKey = 'translated_text_' . md5($text);
        return Cache::remember($cacheKey, 60*60*24, function () use ($text) {
            return $this->translator->translate($text);
        });
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html)) {
            return '';
        }

        $cacheKey = 'translated_html_' . md5($html);
        return Cache::remember($cacheKey, 60*60*24, function () use ($html) {
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
