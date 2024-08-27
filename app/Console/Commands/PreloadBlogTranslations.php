<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\fe\BlogController;

class PreloadBlogTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'preload:blog-translations';

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
        $controller = app(BlogController::class);
        $controller->preloadTranslations();
        $this->info('Blog translations preloaded successfully.');
    }
}
