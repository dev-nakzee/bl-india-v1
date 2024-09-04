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
use DOMDocument;

class BlogController extends Controller
{
    protected $translator;
    protected $locale;
    protected $languages = [
        'en', 'fr', 'es', 'it', 'zh-Hans', 'zh-Hant', 'de', 'ar', 'ja', 'ko', 'ru', 
        'ms', 'vi', 'th', 'pl', 'pt', 'hi', 'mr', 'bn', 'te', 'ta', 'kn', 'ml', 'gu', 'pa'
    ];

    public function __construct(Request $request)
    {
        $this->locale = $request->header('current-locale', 'en'); // Default to 'en' if no locale is set
        $this->translator = new GoogleTranslate($this->locale);
    }

    /**
     * Preload all translations for blogs.
     */
    public function preloadTranslations(): void
    {
        $blogs = Blog::all();
        $blogCategories = BlogCategory::all();

        foreach ($this->languages as $locale) {
            if ($locale == 'en') {
                continue; // Skip translation for English
            }

            $this->translator->setTarget($locale);

            // Preload translations for blogs
            foreach ($blogs as $blog) {
                $this->translateText($blog->title);
                $this->translateText($this->getFirstParagraphContent($blog->content));
            }

            // Preload translations for blog categories
            foreach ($blogCategories as $category) {
                $this->translateText($category->name);
            }
        }
    }

    public function blogs(): JsonResponse
    {
        $page = Page::where('slug', 'blogs')->first();
        $blogs = Blog::orderBy('id', 'desc')->with('blogCategory')->get();
        $categories = BlogCategory::orderBy('id', 'asc')->get();

        foreach ($blogs as $blog) {
            $blog->content = $this->translateText(mb_strimwidth($this->getFirstParagraphContent($blog->content), 0, 250, '...'));
        }

        return response()->json(['page' => $page, 'categories' => $categories, 'blogs' => $blogs]);
    }

    public function blogDetails(string $categorySlug, string $slug): JsonResponse
    {
        $blog = Blog::where('slug', $slug)->first();
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
        
        $categories = BlogCategory::orderBy('id', 'asc')->get();
        $comments = BlogComment::where('blog_id', $blog->id)->where('is_approved', true)->with('client')->get();

        $blog->content = $this->translateHtmlContent($blog->content);

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
        if (is_null($text) || $this->locale === 'en') {
            return $text; // Skip translation if locale is English or text is null
        }

        return $this->translator->translate($text);
    }

    private function translateHtmlContent($html)
    {
        if (is_null($html) || $this->locale === 'en') {
            return $html; // Skip translation if locale is English or HTML is null
        }

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
    }
}
