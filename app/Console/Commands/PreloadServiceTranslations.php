<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\fe\ServiceController;

class PreloadServiceTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'preload:service-translations';

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
        $controller = app(ServiceController::class);
        $controller->preloadTranslations();
        $this->info('Service translations preloaded successfully.');
    }
}
