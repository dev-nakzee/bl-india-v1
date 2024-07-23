<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $settings = [
            [
                'name' => 'logo',
                'value' => null,
            ],
            [
                'name' => 'site_icon',
                'value' => null,
            ],
            // Add more settings as needed
        ];

        foreach ($settings as $setting) {
            DB::table('site_settings')->insert($setting);
        }
    }
}
