<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Stichoza\GoogleTranslate\GoogleTranslate;
use DOMDocument;
use Illuminate\Support\Facades\Cache;

class TranslateContent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $text;
    protected $locale;
    protected $html;
    protected $cacheKey;

    public function __construct($text = null, $html = null, $locale, $cacheKey)
    {
        $this->text = $text;
        $this->html = $html;
        $this->locale = $locale;
        $this->cacheKey = $cacheKey;
    }

    public function handle()
    {
        $translator = new GoogleTranslate($this->locale);

        if ($this->text) {
            $translatedText = $translator->translate($this->text);
            Cache::put($this->cacheKey, $translatedText, 60 * 60 * 24);
        }

        if ($this->html) {
            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML($this->html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $xpath = new \DOMXPath($doc);
            $textNodes = $xpath->query('//text()');

            foreach ($textNodes as $textNode) {
                $textNode->nodeValue = $translator->translate($textNode->nodeValue);
            }

            $translatedHtml = $doc->saveHTML();
            Cache::put($this->cacheKey, $translatedHtml, 60 * 60 * 24);
        }
    }
}
