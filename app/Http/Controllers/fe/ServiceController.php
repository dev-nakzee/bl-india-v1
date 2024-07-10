<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceSection;
use App\Models\ProductServiceMap;
use App\Models\Product;
use App\Models\NoticeProductMap;
use Illuminate\Http\JsonResponse;
use Stichoza\GoogleTranslate\GoogleTranslate;
use DOMDocument;
use Illuminate\Support\Facades\Cache;

class ServiceController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }

    public function services(Request $request): JsonResponse
    {
        $page = Page::where('slug', 'services')->first();
        $query = Service::orderBy('id', 'asc')->with('serviceCategory');

        // Determine the subdomain
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        // Check if the subdomain is 'global' and filter services accordingly
        if ($subdomain === 'global') {
            $query->where('is_global', true);
        }

        $services = $query->get();
        foreach ($services as $service) {
            $service->tagline = $this->translateText($service->tagline);
            $service->description = $this->translateText($service->description);
        }

        // Get the service categories
        $serviceCategoryQuery = ServiceCategory::orderBy('id', 'asc');
        if ($subdomain === 'global') {
            $serviceCategoryQuery->where('is_global', true);
        }
        $serviceCategories = $serviceCategoryQuery->get();

        return response()->json([
            'page' => $page,
            'services' => $services,
            'serviceCategories' => $serviceCategories,
        ]);
    }

    public function serviceDetails(Request $request, string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)->with('serviceCategory')->first();
    
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }
    
        // Determine the subdomain
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];
    
        // Build sections query
        $sectionsQuery = ServiceSection::where('service_id', $service->id)->orderBy('id', 'asc');
    
        // Check if the subdomain is 'global' and filter sections accordingly
        if ($subdomain === 'global') {
            $sectionsQuery->where('is_global', true);
        }
    
        $sections = $sectionsQuery->get();
        foreach ($sections as $section) {
            $section->name = $this->translateText($section->name);
            $section->content = $this->translateHtmlContent($section->content);
        }
    
        // Fetch related services from the same category
        $relatedServicesQuery = Service::where('service_category_id', $service->service_category_id)
            ->with('serviceCategory')
            ->where('id', '!=', $service->id)
            ->limit(3);
    
        $relatedServices = $relatedServicesQuery->get();
    
        $relatedCount = $relatedServices->count();
    
        // If there are fewer than 3 related services in the same category, fetch additional services from other categories
        if ($relatedCount < 3) {
            $additionalServicesQuery = Service::where('id', '!=', $service->id)
                ->whereNotIn('id', $relatedServices->pluck('id')->toArray())
                ->limit(3 - $relatedCount);
    
            $additionalServices = $additionalServicesQuery->get();
    
            $relatedServices = $relatedServices->merge($additionalServices);
        }
    
        return response()->json(['service' => $service, 'sections' => $sections, 'related_services' => $relatedServices]);
    }
    

    public function getMandatoryProducts(Request $request, $serviceId): JsonResponse
    {
        $products = ProductServiceMap::where('service_id', $serviceId)
            ->with(['product.productCategory', 'service'])
            ->get()
            ->map(function ($productServiceMap) {
                return [
                    'category_id' => $productServiceMap->product->productCategory->id,
                    'product_name' => $this->translateText($productServiceMap->product->name),
                    'product_slug' => $productServiceMap->product->slug,
                    'product_is_standard' => $productServiceMap->is,
                    'product_group' => $productServiceMap->group,
                    'product_scheme' => $productServiceMap->scheme,
                    'product_others' => $productServiceMap->others,
                    'product_category_name' => $this->translateText($productServiceMap->product->productCategory->name),
                    'service_compliance' => $productServiceMap->service->compliance_header,
                ];
            })
            ->sortBy('category_id')
            ->values()
            ->all();

        return response()->json($products);
    }

    public function productDetails(Request $request, string $slug): JsonResponse
    {
        $product = Product::where('slug', $slug)->with(['productCategory','services', 'services', 'services.service', 'services.service.serviceCategory'])->first();
        $notification = NoticeProductMap::where('product_id', $product->id)->with('notification', 'notification.category')->get();
        $product->name = $this->translateText($product->name);
        $product->description = $this->translateHtmlContent($product->description);
        foreach ($product->services as $service) {
            $service->details = $this->translateHtmlContent($service->details);
        }

        return response()->json(['product' => $product, 'notification' => $notification, 'test' => $product->name]);
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
    return Cache::remember($cacheKey, 60 * 60 * 24, function () use ($html) {
        $doc = new DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();

        $xpath = new \DOMXPath($doc);
        $textNodes = $xpath->query('//text()');

        foreach ($textNodes as $textNode) {
            if (trim($textNode->nodeValue)) {
                $textNode->nodeValue = $this->translateText($textNode->nodeValue);
            }
        }

        $translatedHtml = $doc->saveHTML();

        // Ensure proper encoding and HTML structure
        return $this->cleanHtml($translatedHtml);
    });
}

private function cleanHtml($html)
{
    // Remove unwanted tags and adjust HTML structure
    $html = preg_replace('/^<!DOCTYPE.+?>/', '', $html);
    $html = str_replace(['<html>', '</html>', '<body>', '</body>'], '', $html);

    // Fix incorrect nested tags
    $html = preg_replace('/<\/h3><p/', '</h3><p', $html);
    $html = preg_replace('/<\/p><\/h3>/', '</p>', $html);

    return trim($html);
}

}

