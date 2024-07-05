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

class DownloadController extends Controller
{
    //
    public function download(): JsonResponse
    {
        $page = Page::where('slug', 'downloads')->first();
        $downloadCategories = DownloadCategory::orderBy('id', 'asc')->get();
        $downloads = Download::with('category', 'files')->get();
        foreach ($downloads as $download) {
            $download->name = $this->translateText($download->name);
            foreach ($download->files as $file)
            {
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
