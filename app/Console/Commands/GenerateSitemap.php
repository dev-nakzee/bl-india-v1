<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Page;
use App\Models\ServiceCategory;
use App\Models\Service;
use App\Models\Product;
use App\Models\BlogCategory;
use App\Models\Blog;
use App\Models\Notification;
use App\Models\NotificationCategory;
use App\Models\KnowledgeBaseCategory;
use App\Models\DownloadCategory;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $sitemap = Sitemap::create();
        $sitemap->add(Url::create('/'));
        $pages = Page::where('slug', '!=', 'home')->get();
        foreach ($pages as $page) {
            $sitemap->add(Url::create($page->slug));
        }
        $serviceCategories = ServiceCategory::all();
        foreach ($serviceCategories as $serviceCategory) {
            $sitemap->add(Url::create('/services/'. $serviceCategory->slug));
        }
        $services = Service::with('serviceCategory')->get();
        foreach ($services as $service) {
            $sitemap->add(Url::create('/services/'. $service->serviceCategory->slug. '/'. $service->slug));
        }
        $products = Product::all();
        foreach ($products as $product) {
            $sitemap->add(Url::create('/products/'. $product->slug));
        }
        $blogCategories = BlogCategory::all();
        foreach ($blogCategories as $blogCategory) {
            $sitemap->add(Url::create('/blog/'. $blogCategory->slug));
        }
        $blogs = Blog::with('blogCategory')->get();
        foreach ($blogs as $blog) {
            $sitemap->add(Url::create('/blog/'. $blog->blogCategory->slug. '/'. $blog->slug));
        }
        $notificationCategories = NotificationCategory::all();
        foreach ($notificationCategories as $notificationCategory) {
            $sitemap->add(Url::create('/notifications/'. $notificationCategory->slug));
        }
        $notifications = Notification::with('category')->get();
        foreach ($notifications as $notification) {
            $sitemap->add(Url::create('/notifications/'. $notification->category->slug. '/'. $notification->slug));
        }
        $knowledgeBaseCategories = KnowledgeBaseCategory::all();
        foreach ($knowledgeBaseCategories as $knowledgeBaseCategory) {
            $sitemap->add(Url::create('/knowledge-base/'. $knowledgeBaseCategory->slug));
        }
        $downloadCategories = DownloadCategory::all();
        foreach ($downloadCategories as $downloadCategory) {
            $sitemap->add(Url::create('/downloads/'. $downloadCategory->slug));
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
        $this->info('Sitemap generated successfully!');
    }
}
