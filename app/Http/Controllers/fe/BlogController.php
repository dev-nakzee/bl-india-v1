<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    //
    public function blogs(): JsonResponse
    {
        $page = Page::where('slug', 'blogs')->first();
        $blogs = Blog::orderBy('id', 'desc')->get();
        $category = BlogCategory::where('id', 'asc')->get();
        return response()->json(['page' => $page, 'blogs' => $blogs]);
    }
}
