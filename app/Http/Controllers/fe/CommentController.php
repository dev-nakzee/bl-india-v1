<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Models\BlogComment;

class CommentController extends Controller
{
    //
    public function comments(Request $request): JsonResponse
    {
        // Get the currently authenticated user
        $user = Auth::user();

        // Fetch comments associated with the user
        $comments = BlogComment::where('client_id', $user->id)->get();

        if ($comments->isEmpty()) {
            return response()->json(['message' => 'No comments found'], 404);
        }
        
        return response()->json($comments);
    }
}
