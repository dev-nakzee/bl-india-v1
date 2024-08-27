<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\fe\AboutController;

class PreloadAboutTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'preload:about-translations';

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
        $controller = app(AboutController::class);
        $controller->preloadTranslations();

        $this->info('About translations preloaded successfully.');
    }
}
