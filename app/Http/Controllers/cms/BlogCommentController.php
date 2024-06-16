<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlogCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $comments = BlogComment::with(['blog', 'client'])->get();
        return response()->json($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'client_id' => 'required|exists:clients,id',
            'comments' => 'required|string',
            'is_approved' => 'required|boolean',
        ]);

        $comment = BlogComment::create($validated);

        return response()->json($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $comment = BlogComment::with(['blog', 'client'])->findOrFail($id);
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'blog_id' => 'sometimes|required|exists:blogs,id',
            'client_id' => 'sometimes|required|exists:clients,id',
            'comments' => 'sometimes|required|string',
            'is_approved' => 'sometimes|required|boolean',
        ]);

        $comment = BlogComment::findOrFail($id);
        $comment->update($validated);

        return response()->json($comment, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $comment = BlogComment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }
}
