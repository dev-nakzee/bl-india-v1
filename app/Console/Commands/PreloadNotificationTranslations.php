<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\fe\NotificationController;

class PreloadNotificationTranslations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'preload:notification-translations';

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
        $controller = app(NotificationController::class);
        $controller->preloadTranslations();
        $this->info('Notification translations preloaded successfully.');

    }
}
