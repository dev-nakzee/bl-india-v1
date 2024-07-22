<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Service;
use App\Models\Blog;
use App\Models\KnowledgeBase;
use Illuminate\Support\Facades\Cache;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = [];

        if ($query) {
            $cacheKey = 'search_' . md5($query);
            $results = Cache::remember($cacheKey, 3600, function () use ($query) {
                return [
                    'products' => Product::select('id', 'name', 'description', 'slug')
                        ->whereRaw("MATCH (name, description) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query])
                        ->with(['notifications:id,name', 'services:id,service_id,product_id'])
                        ->get(),

                    'services' => Service::select('id', 'name', 'description', 'slug', 'service_category_id')
                        ->whereRaw("MATCH (name, description) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query])
                        ->orWhereHas('serviceSections', function ($q) use ($query) {
                            $q->whereRaw("MATCH (name, content) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query]);
                        })
                        ->with(['serviceSections:id,service_id,name,content', 'serviceCategory:id,slug'])
                        ->get(),

                    'blogs' => Blog::select('id', 'name', 'content', 'slug', 'blog_category_id')
                        ->whereRaw("MATCH (name, content) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query])
                        ->with('blogCategory:id,slug')
                        ->get(),

                    'knowledge_base' => KnowledgeBase::select('id', 'question', 'answer', 'slug', 'knowledge_base_category_id')
                        ->whereRaw("MATCH (question, answer) AGAINST (? IN NATURAL LANGUAGE MODE)", [$query])
                        ->with('category:id,slug')
                        ->get(),
                ];
            });
        }

        return view('search.results', compact('results', 'query'));
    }
}
