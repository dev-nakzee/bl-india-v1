<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBase;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class KnowledgeBaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $knowledgeBases = KnowledgeBase::with(['category'])->get();
        return response()->json($knowledgeBases);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'knowledge_base_category_id' =>'required|exists:knowledge_base_categories,id',
            'question' => 'required|unique:knowledge_bases,question',
            'answer' => 'required',
            'slug' => 'required|string|max:255|unique:knowledge_bases,slug',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);
        $knowledgeBase = KnowledgeBase::create($validated);
        return response()->json($knowledgeBase, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $knowledgeBase = KnowledgeBase::findOrFail($id);
        return response()->json($knowledgeBase);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $knowledgeBase = KnowledgeBase::findOrFail($id);

        $validated = $request->validate([
            'knowledge_base_category_id' =>'required|exists:knowledge_base_categories,id',
            'question' =>'sometimes|required|unique:knowledge_bases,question,'. $id,
            'answer' =>'sometimes|required',
            'slug' =>'sometimes|required|string|max:255|unique:knowledge_bases,slug,'. $id,
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
        ]);

        $knowledgeBase->update($validated);

        return response()->json($knowledgeBase, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $knowledgeBase = KnowledgeBase::findOrFail($id);
        $knowledgeBase->delete();
        return response()->json(null, 204);
    }
}
