<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Sitemap;
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
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap for the site';

    public function handle()
    {
        $sitemap = new Sitemap();

        // Home page with high priority
        $sitemap->add(Url::create('/')
            ->setLastModificationDate(Carbon::yesterday())
            ->setPriority(1.0));

        // Define priority levels
        $priorityMap = [
            Page::class => 0.8,
            ServiceCategory::class => 0.9,
            Service::class => 0.7,
            Product::class => 0.7,
            BlogCategory::class => 0.8,
            Blog::class => 0.5,
            NotificationCategory::class => 0.9,
            Notification::class => 0.6,
            KnowledgeBaseCategory::class => 0.8,
            DownloadCategory::class => 0.9,
        ];

        // Add dynamic content with varying priorities
        foreach ($priorityMap as $model => $priority) {
            $items = $model::all();
            foreach ($items as $item) {
                $path = $this->getPathPrefix($model) . $item->slug;
                $sitemap->add(Url::create($path)
                    ->setLastModificationDate($item->updated_at ?? Carbon::now())
                    ->setPriority($priority));
            }
        }

        // Save the sitemap to the public directory
        $sitemap->writeToFile(public_path('sitemap.xml'));
        $this->info('Sitemap generated successfully!');
    }

    private function getPathPrefix($model)
    {
        $paths = [
            Page::class => '/',
            ServiceCategory::class => '/services/',
            Service::class => '/services/',
            Product::class => '/products/',
            BlogCategory::class => '/blog/',
            Blog::class => '/blog/',
            NotificationCategory::class => '/notifications/',
            Notification::class => '/notifications/',
            KnowledgeBaseCategory::class => '/knowledge-base/',
            DownloadCategory::class => '/downloads/',
        ];

        return $paths[$model] ?? '/';
    }
}
