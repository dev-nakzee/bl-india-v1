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
        foreach ($blogs as $blog) {
            $blog->content = mb_strimwidth($this->getFirstParagraphContent($blog->content), 0, 250, '...');
        }
        return response()->json(['page' => $page, 'category' => $category, 'blogs' => $blogs]);
    }

    protected function getFirstParagraphContent(string $html): ?string
    {
        $dom = new \DOMDocument();
        // Suppress warnings from malformed HTML
        @$dom->loadHTML('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' . $html);
        
        $paragraphs = $dom->getElementsByTagName('p');
        if ($paragraphs->length > 0) {
            return $paragraphs->item(0)->textContent;
        }

        return null;
    }
}
