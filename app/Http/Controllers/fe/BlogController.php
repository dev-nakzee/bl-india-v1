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
        $category = BlogCategory::orderBy('id', 'asc')->get();
        $blogs = Blog::orderBy('id', 'desc')->limit(3)->get();
        foreach ($blogs as $blog) {
            $blog->content = mb_strimwidth($this->getFirstParagraphContent($blog->content), 0, 250, '...');
        }
        return response()->json(['page' => $page, 'category' => $category, 'blogs' => $blogs]);
    }
}
