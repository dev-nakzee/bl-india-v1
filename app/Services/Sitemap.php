<?php

namespace App\Services;

use Spatie\Sitemap\Sitemap as BaseSitemap;
use Spatie\Sitemap\Tags\Url;

class Sitemap extends BaseSitemap
{
    public function render(): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        /** @var Url $tag */
        foreach ($this->tags as $tag) {
            $xml .= '<url>';
            $xml .= "<loc>{$tag->url}</loc>";
            $xml .= "<lastmod>{$tag->lastModificationDate->toAtomString()}</lastmod>";
            $xml .= "<priority>{$tag->priority}</priority>";
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
