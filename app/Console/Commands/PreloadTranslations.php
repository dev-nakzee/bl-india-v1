<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PreloadTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:preload-translations';

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
        $homeController = app(\App\Http\Controllers\fe\HomeController::class);
        $homeController->preloadTranslations();
    
        $this->info('Translations preloaded successfully.');
    }
}
