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
use Carbon\Carbon;

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
    protected $description = 'Generate the sitemap for the site';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();

        // Add homepage
        $sitemap->add(Url::create('/')
            ->setLastModificationDate(Carbon::yesterday())
            ->setPriority(1.00)); // Set priority to 1.00

        // Add pages
        $pages = Page::where('slug', '!=', 'home')->get();
        foreach ($pages as $page) {
            $sitemap->add(Url::create($page->slug)
                ->setLastModificationDate($page->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add service categories
        $serviceCategories = ServiceCategory::all();
        foreach ($serviceCategories as $serviceCategory) {
            $sitemap->add(Url::create('/services/' . $serviceCategory->slug)
                ->setLastModificationDate($serviceCategory->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add services
        $services = Service::with('serviceCategory')->get();
        foreach ($services as $service) {
            $sitemap->add(Url::create('/services/' . $service->serviceCategory->slug . '/' . $service->slug)
                ->setLastModificationDate($service->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add products
        $products = Product::all();
        foreach ($products as $product) {
            $sitemap->add(Url::create('/products/' . $product->slug)
                ->setLastModificationDate($product->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add blog categories
        $blogCategories = BlogCategory::all();
        foreach ($blogCategories as $blogCategory) {
            $sitemap->add(Url::create('/blog/' . $blogCategory->slug)
                ->setLastModificationDate($blogCategory->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add blogs
        $blogs = Blog::with('blogCategory')->get();
        foreach ($blogs as $blog) {
            $sitemap->add(Url::create('/blog/' . $blog->blogCategory->slug . '/' . $blog->slug)
                ->setLastModificationDate($blog->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add notification categories
        $notificationCategories = NotificationCategory::all();
        foreach ($notificationCategories as $notificationCategory) {
            $sitemap->add(Url::create('/notifications/' . $notificationCategory->slug)
                ->setLastModificationDate($notificationCategory->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add notifications
        $notifications = Notification::with('category')->get();
        foreach ($notifications as $notification) {
            $sitemap->add(Url::create('/notifications/' . $notification->category->slug . '/' . $notification->slug)
                ->setLastModificationDate($notification->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add knowledge base categories
        $knowledgeBaseCategories = KnowledgeBaseCategory::all();
        foreach ($knowledgeBaseCategories as $knowledgeBaseCategory) {
            $sitemap->add(Url::create('/knowledge-base/' . $knowledgeBaseCategory->slug)
                ->setLastModificationDate($knowledgeBaseCategory->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Add download categories
        $downloadCategories = DownloadCategory::all();
        foreach ($downloadCategories as $downloadCategory) {
            $sitemap->add(Url::create('/downloads/' . $downloadCategory->slug)
                ->setLastModificationDate($downloadCategory->updated_at)
                ->setPriority(1.00)); // Set priority to 1.00
        }

        // Save the sitemap to the public directory
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully!');
    }
}
