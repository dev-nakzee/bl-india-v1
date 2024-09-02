<?php
namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Page;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceSection;
use App\Models\ProductServiceMap;
use App\Models\Product;
use App\Models\NoticeProductMap;
use Stichoza\GoogleTranslate\GoogleTranslate;
use DOMDocument;

class ServiceController extends Controller
{
    protected $translator;
    protected $locale;
    protected $languages = [
        'en', 'fr', 'es', 'it', 'zh-Hans', 'zh-Hant', 'de', 'ar', 'ja', 'ko', 'ru', 
        'ms', 'vi', 'th', 'pl', 'pt', 'hi', 'mr', 'bn', 'te', 'ta', 'kn', 'ml', 'gu', 'pa'
    ];

    public function __construct(Request $request)
    {
        $this->locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($this->locale);
    }

    /**
     * Preload all translations.
     */
    public function preloadTranslations(): void
    {
        $services = Service::with('serviceCategory')->get();
        $serviceCategories = ServiceCategory::all();
        $serviceSections = ServiceSection::all();
        $products = Product::with('categories')->get();

        foreach ($this->languages as $locale) {
            if ($locale == 'en') {
                continue; // Skip translation for English
            }
            $this->translator->setTarget($locale);

            // Preload translations for services
            foreach ($services as $service) {
                $this->translateText($service->tagline);
                $this->translateText($service->description);
            }

            // Preload translations for service categories
            foreach ($serviceCategories as $category) {
                $this->translateText($category->name);
            }

            // Preload translations for service sections
            foreach ($serviceSections as $section) {
                $this->translateText($section->name);
                $this->translateHtmlContent($section->content);
            }

            // Preload translations for products
            foreach ($products as $product) {
                $this->translateText($product->name);
                $this->translateHtmlContent($product->description);
            }
        }
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
    
            $additionalServices = $additionalServicesQuery->with('serviceCategory')->get();
    
            $relatedServices = $relatedServices->merge($additionalServices);
        }

        foreach ($relatedServices as $relatedService)
        {
            $relatedService->description = $this->translateText($relatedService->description);
        }
    
        return response()->json(['service' => $service, 'sections' => $sections, 'related_services' => $relatedServices]);
    }

    public function getMandatoryProducts(Request $request, $serviceId): JsonResponse
    {
        $products = ProductServiceMap::where('service_id', $serviceId)
            ->with(['product.categories', 'service.serviceCategory'])
            ->get()
            ->map(function ($productServiceMap) {
                $product = $productServiceMap->product;
                $service = $productServiceMap->service;
                return [
                    'product_id' => $product->id,
                    'product_name' => $this->translateText($product->name),
                    'product_slug' => $product->slug,
                    'product_is_standard' => $productServiceMap->is,
                    'product_group' => $productServiceMap->group,
                    'product_scheme' => $productServiceMap->scheme,
                    'product_others' => $productServiceMap->others,
                    'product_category_ids' => $product->categories->pluck('id')->toArray(),
                    'product_category_names' => $product->categories->pluck('name')->map(function ($name) {
                        return $this->translateText($name);
                    })->toArray(),
                    'service_compliance' => $service->compliance_header,
                ];
            })
            ->sortBy('product_id')
            ->values()
            ->all();
    
        return response()->json($products);
    }
    

    public function productDetails(Request $request, string $slug): JsonResponse
    {
        $product = Product::where('slug', $slug)
            ->with(['categories'])
            ->firstOrFail();

        $services = ProductServiceMap::where('product_id', $product->id)
            ->with(['service', 'service.serviceCategory'])
            ->get()
            ->map(function ($productServiceMap) {
                return [
                    'id' => $productServiceMap->service->id,
                    'name' => $this->translateText($productServiceMap->service->name),
                    'slug' => $productServiceMap->service->slug,
                    'details' => $this->translateHtmlContent($productServiceMap->details),
                    'compliance_header' => $productServiceMap->service->compliance_header,
                    'is' => $productServiceMap->is,
                    'group' => $productServiceMap->group,
                    'scheme' => $productServiceMap->scheme,
                    'others' => $productServiceMap->others,
                    'is_mandatory' => $productServiceMap->is_mandatory,
                    'service_category' => [
                        'id' => $productServiceMap->service->serviceCategory->id,
                        'name' => $this->translateText($productServiceMap->service->serviceCategory->name),
                        'slug' => $productServiceMap->service->serviceCategory->slug,
                    ],
                ];
            });

        $notification = NoticeProductMap::where('product_id', $product->id)
            ->with('notification', 'notification.category')
            ->get();

        $product->name = $this->translateText($product->name);
        $product->description = $this->translateHtmlContent($product->description);

        $categories = $product->categories->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $this->translateText($category->name),
            ];
        });

        return response()->json([
            'product' => $product,
            'services' => $services,
            'categories' => $categories,
            'notification' => $notification,
        ]);
    }

    private function translateText($text)
    {
        if (is_null($text) || $this->locale === 'en') {
            return $text; // Skip translation if locale is English or text is null
        }

        return $this->translator->translate($text);
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html) || $this->locale === 'en') {
            return $html; // Skip translation if locale is English or HTML is null
        }

        $doc = new DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();

        $translatedHtml = $this->translateDomNode($doc->documentElement);
        return $translatedHtml;
    }

    private function translateDomNode($node)
    {
        $translatedHtml = '';

        foreach ($node->childNodes as $child) {
            if ($child->nodeType === XML_TEXT_NODE) {
                $translatedHtml .= $this->translateText($child->nodeValue);
            } elseif ($child->nodeType === XML_ELEMENT_NODE) {
                $translatedHtml .= '<' . $child->nodeName;

                if ($child->hasAttributes()) {
                    foreach ($child->attributes as $attr) {
                        $translatedHtml .= ' ' . $attr->nodeName . '="' . htmlspecialchars($attr->nodeValue) . '"';
                    }
                }

                $translatedHtml .= '>';
                $translatedHtml .= $this->translateDomNode($child);
                $translatedHtml .= '</' . $child->nodeName . '>';
            }
        }

        return $translatedHtml;
    }
}
