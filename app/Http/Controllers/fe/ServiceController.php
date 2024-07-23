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
    
            $additionalServices = $additionalServicesQuery->with('serviceCategory')->get();
    
            $relatedServices = $relatedServices->merge($additionalServices);
        }
    
        return response()->json(['service' => $service, 'sections' => $sections, 'related_services' => $relatedServices]);
    }

    public function getMandatoryProducts(Request $request, $serviceId): JsonResponse
    {
        $products = ProductServiceMap::where('service_id', $serviceId)
            ->with(['product.categories', 'service'])
            ->get()
            ->map(function ($productServiceMap) {
                return [
                    'product_id' => $productServiceMap->product->id,
                    'product_name' => $this->translateText($productServiceMap->product->name),
                    'product_slug' => $productServiceMap->product->slug,
                    'product_is_standard' => $productServiceMap->is_standard,
                    'product_group' => $productServiceMap->group,
                    'product_scheme' => $productServiceMap->scheme,
                    'product_others' => $productServiceMap->others,
                    'product_category_ids' => $productServiceMap->product->categories->pluck('id')->toArray(),
                    'product_category_names' => $productServiceMap->product->categories->pluck('name')->map(function ($name) {
                        return $this->translateText($name);
                    })->toArray(),
                    'service_compliance' => $productServiceMap->service->compliance_header,
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

            $translatedHtml = $this->translateDomNode($doc->documentElement);
            return $translatedHtml;
        });
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
