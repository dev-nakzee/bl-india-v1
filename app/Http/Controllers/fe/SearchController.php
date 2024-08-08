<?php
namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Service;
use App\Models\Blog;
use App\Models\KnowledgeBase;
use App\Models\ProductServiceMap;

class SearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $query = $request->input('query');
        $results = [];

        if ($query) {
            // Search Products
            $results['products'] = Product::whereRaw("search_vector @@ plainto_tsquery('english', ?)", [$query])
                ->select('id', 'name', 'slug')
                ->with(['services.serviceCategory'])
                ->get()
                ->map(function($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'services' => $product->services->map(function($service) {
                            return [
                                'service_id' => $service->id,
                                'service_name' => $service->name,
                                'service_slug' => $service->slug,
                                'service_category_slug' => $service->serviceCategory->slug
                            ];
                        })
                    ];
                });

            // Search Services
            $results['services'] = Service::whereRaw("to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', ?)", [$query])
                ->orWhereHas('serviceSections', function ($q) use ($query) {
                    $q->whereRaw("to_tsvector('english', name || ' ' || content) @@ plainto_tsquery('english', ?)", [$query]);
                })
                ->with('serviceCategory', 'serviceSections')
                ->select('id', 'name', 'slug', 'service_category_id')
                ->get();

            // Search Blogs
            $results['blogs'] = Blog::whereRaw("to_tsvector('english', name || ' ' || content) @@ plainto_tsquery('english', ?)", [$query])
                ->select('id', 'name', 'slug', 'blog_category_id')
                ->with('blogCategory')
                ->get();

            // Search Knowledge Base
            $results['knowledge_base'] = KnowledgeBase::whereRaw("to_tsvector('english', question || ' ' || answer) @@ plainto_tsquery('english', ?)", [$query])
                ->select('id', 'question', 'answer', 'knowledge_base_category_id')
                ->with('category')
                ->get();
            
                $results['standards'] = ProductServiceMap::where('is', 'LIKE', "%$query%")
                ->orWhere('others', 'LIKE', "%$query%")
                ->orWhere('scheme', 'LIKE', "%$query%")
                ->orWhere('group', 'LIKE', "%$query%")
                ->with(['product' => function($query) {
                        $query->select('id', 'name', 'slug')
                              ->with(['services' => function($query) {
                                  $query->select('id', 'name', 'slug', 'service_category_id')
                                        ->with(['serviceCategory' => function($query) {
                                            $query->select('id', 'slug');
                                        }]);
                              }]);
                    },
                    'service' => function($query) {
                        $query->select('id', 'name', 'slug', 'service_category_id')
                              ->with(['serviceCategory' => function($query) {
                                  $query->select('id', 'slug');
                              }]);
                    }])
                ->get()
                ->map(function($map) {
                    return [
                        'product' => [
                            'id' => $map->product->id,
                            'name' => $map->product->name,
                            'slug' => $map->product->slug,
                            'category_slug' => $map->product->services->map(function($service) {
                                return $service->serviceCategory->slug;
                            })
                        ],
                        'service' => [
                            'id' => $map->service->id,
                            'name' => $map->service->name,
                            'slug' => $map->service->slug,
                            'category_slug' => $map->service->serviceCategory->slug
                        ]
                    ];
                });
            

        }

        return response()->json($results);
    }
}
