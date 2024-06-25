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
        $categories = KnowledgeBaseCategory::orderBy('is_featured', 'desc')->get();
        return response()->json([
            'page' => $page,
            'categories' => $categories,
        ]);
    }

    public function knowledgeBaseSearch($searchKeywords): JsonResponse
    {
        $knowledgeBases = KnowledgeBase::where('question', 'like', '%'. $searchKeywords. '%')->get();
        return response()->json($knowledgeBases);
    }
    public function knowledgeBaseCategory($slug): JsonResponse
    {
        $category = KnowledgeBaseCategory::where('slug', $slug)->first();
        $knowledgeBases = KnowledgeBase::where('knowledge_base_category_id', $category->id)->get();
        return response()->json([
            'category' => $category,
            'knowledgeBases' => $knowledgeBases,
        ]);
    }
}
