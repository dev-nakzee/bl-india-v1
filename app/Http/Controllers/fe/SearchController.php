<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Product;
use App\Models\Service;
use App\Models\Blog;
use App\Models\KnowledgeBase;
use App\Models\NoticeProductMap;
use App\Models\ProductServiceMap;
use App\Models\ServiceSection;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = [];

        if ($query) {
            // Search Products with related Notifications and Services
            $results['products'] = Product::where('name', 'LIKE', "%{$query}%")
                ->orWhere('description', 'LIKE', "%{$query}%")
                ->with(['notifications', 'services.service'])
                ->get();

            // Search Services and their related Sections
            $results['services'] = Service::where('name', 'LIKE', "%{$query}%")
                ->orWhere('description', 'LIKE', "%{$query}%")
                ->orWhereHas('serviceSections', function ($q) use ($query) {
                    $q->where('name', 'LIKE', "%{$query}%")
                      ->orWhere('content', 'LIKE', "%{$query}%");
                })
                ->with('serviceSections')
                ->get();

            // Search Blogs
            $results['blogs'] = Blog::where('name', 'LIKE', "%{$query}%")
                ->orWhere('content', 'LIKE', "%{$query}%")
                ->get();

            // Search KnowledgeBase
            $results['knowledge_base'] = KnowledgeBase::where('question', 'LIKE', "%{$query}%")
                ->orWhere('answer', 'LIKE', "%{$query}%")
                ->get();
        }

        return view('search.results', compact('results', 'query'));
    }
}
