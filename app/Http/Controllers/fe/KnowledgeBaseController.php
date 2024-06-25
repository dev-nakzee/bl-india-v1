<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\KnowledgeBase;
use App\Models\KnowledgeBaseCategory;
use Illuminate\Http\JsonResponse;

class KnowledgeBaseController extends Controller
{
    //
    public function knowledgeBase(): JsonResponse
    {
        $page = Page::where('slug', 'knowledge-base')->first();
        $categories = KnowledgeBaseCategory::orderBy('id', 'asc')->get();
        return response()->json([
            'page' => $page,
            'categories' => $categories,
        ]);
    }

    public function knowledgeBaseCategory($slug): JsonResponse
    {
        $page = Page::where('slug', 'knowledge-base')->first();
        // $category = KnowledgeBaseCategory::where('slug', $slug)->first();
        $knowledgeBases = KnowledgeBase::where('knowledge_base_category_id', $category->id)->get();
        return response()->json([
            'page' => $page,
            // 'category' => $category,
            'knowledgeBases' => $knowledgeBases,
        ]);
    }

    
}
