<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Service;
use App\Models\Blog;
use App\Models\KnowledgeBase;

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
                ->with(['notifications', 'services.service'])
                ->get();

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
        }

        return response()->json($results);
    }
}
