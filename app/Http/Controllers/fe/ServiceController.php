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
use Illuminate\Support\Facades\Cache;
use App\Jobs\TranslateContent;

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
            $service->tagline = $this->translateText($service->tagline, $request->header('current-locale'));
            $service->description = $this->translateText($service->description, $request->header('current-locale'));
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
            $section->name = $this->translateText($section->name, $request->header('current-locale'));
            $section->content = $this->translateHtmlContent($section->content, $request->header('current-locale'));
        }

        return response()->json(['service' => $service, 'sections' => $sections]);
    }

    public function getMandatoryProducts(Request $request, $serviceId): JsonResponse
    {
        $products = ProductServiceMap::where('service_id', $serviceId)
            ->with(['product.productCategory', 'service'])
            ->get()
            ->map(function ($productServiceMap) use ($request) {
                return [
                    'category_id' => $productServiceMap->product->productCategory->id,
                    'product_name' => $this->translateText($productServiceMap->product->name, $request->header('current-locale')),
                    'product_slug' => $productServiceMap->product->slug,
                    'product_is_standard' => $productServiceMap->is,
                    'product_group' => $productServiceMap->group,
                    'product_scheme' => $productServiceMap->scheme,
                    'product_others' => $productServiceMap->others,
                    'product_category_name' => $this->translateText($productServiceMap->product->productCategory->name, $request->header('current-locale')),
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
        $product->name = $this->translateText($product->name, $request->header('current-locale'));
        $product->description = $this->translateHtmlContent($product->description, $request->header('current-locale'));
        foreach ($product->services as $service) {
            $service->details = $this->translateHtmlContent($service->details, $request->header('current-locale'));
        }

        return response()->json(['product' => $product, 'notification' => $notification]);
    }

    private function translateText($text, $locale)
    {
        if (is_null($text)) {
            return '';
        }

        $cacheKey = 'translated_text_' . md5($text . $locale);
        if (!Cache::has($cacheKey)) {
            TranslateContent::dispatch($text, null, $locale, $cacheKey);
        }
        
        return Cache::get($cacheKey, $text);
    }

    private function translateHtmlContent($html, $locale)
    {
        if (is_null($html)) {
            return '';
        }

        $cacheKey = 'translated_html_' . md5($html . $locale);
        if (!Cache::has($cacheKey)) {
            TranslateContent::dispatch(null, $html, $locale, $cacheKey);
        }

        return Cache::get($cacheKey, $html);
    }
}
