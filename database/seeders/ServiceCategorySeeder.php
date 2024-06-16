<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ServiceCategory;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ServiceCategory::create([
            'name' => 'Bureau of Indian Standards',
            'slug' =>'bis',
            'description' => 'Bureau of Indian Standards',
            'is_global' => true
        ]);

        ServiceCategory::create([
            'name' => 'Wireless & Telecommunication',
            'slug' =>'wireless-telecom',
            'description' => 'Wireless & Telecommunication',
            'is_global' => true
        ]);

        ServiceCategory::create([
            'name' => 'Extended Producer Responsibility',
            'slug' =>'epr',
            'description' => 'Extended Producer Responsibility',
            'is_global' => false
        ]);

        ServiceCategory::create([
            'name' => 'Bureau of Energy Efficiency',
            'slug' =>'bee',
            'description' => 'Bureau of Energy Efficiency',
            'is_global' => false
        ]);

        ServiceCategory::create([
            'name' => 'Intellectual Property',
            'slug' =>'ip',
            'description' => 'Intellectual Property',
            'is_global' => false
        ]);
    }
}
