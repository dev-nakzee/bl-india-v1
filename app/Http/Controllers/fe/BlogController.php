<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\BlogComment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Facades\Cache;
use DOMDocument;

class BlogController extends Controller
{
    protected $translator;

    public function __construct(Request $request)
    {
        $locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($locale);
    }

    public function blogs(): JsonResponse
    {
        $page = Cache::remember('page_blogs', 60*60*24, function() {
            return Page::where('slug', 'blogs')->first();
        });
        $blogs = Cache::remember('blogs_list', 60*60*24, function() {
            return Blog::orderBy('id', 'desc')->with('blogCategory')->get();
        });
        $categories = Cache::remember('blog_categories', 60*60*24, function() {
            return BlogCategory::orderBy('id', 'asc')->get();
        });

        foreach ($blogs as $blog) {
            $blog->content = $this->translateText(mb_strimwidth($this->getFirstParagraphContent($blog->content), 0, 250, '...'));
        }

        return response()->json(['page' => $page, 'categories' => $categories, 'blogs' => $blogs]);
    }

    public function blogDetails(string $categorySlug, string $slug): JsonResponse
    {
        $blog = Cache::remember("blog_details_{$slug}", 60*60*24, function() use ($slug) {
            return Blog::where('slug', $slug)->first();
        });
        $categories = Cache::remember('blog_categories', 60*60*24, function() {
            return BlogCategory::orderBy('id', 'asc')->get();
        });
        $comments = BlogComment::where('blog_id', $blog->id)->where('is_approved', true)->with('client')->get();
        // $blog->content = $this->translateHtmlContent($blog->content);

        return response()->json(['blog' => $blog, 'categories' => $categories, 'comments' => $comments]);
    }
    public function postComment(Request $request, $blogId): JsonResponse
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        $comment = new BlogComment();
        $comment->blog_id = $blogId;
        $comment->client_id = Auth::id();
        $comment->comments = $request->comment;
        $comment->is_approved = false; // or true based on your requirement
        $comment->save();

        return response()->json($comment, 201);
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

    private function translateText($text)
    {
        if (is_null($text)) {
            return '';
        }

        $cacheKey = 'translated_text_' . md5($text);
        return Cache::remember($cacheKey, 60*60*24, function () use ($text) {
            return $this->translator->translate($text);
        });
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html)) {
            return '';
        }

        $cacheKey = 'translated_html_' . md5($html);
        return Cache::remember($cacheKey, 60*60*24, function () use ($html) {
            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $xpath = new \DOMXPath($doc);
            $textNodes = $xpath->query('//text()');

            foreach ($textNodes as $textNode) {
                $textNode->nodeValue = $this->translateText($textNode->nodeValue);
            }

            return $doc->saveHTML();
        });
    }
}
