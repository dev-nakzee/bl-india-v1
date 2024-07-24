<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'technical_name',
        'description',
        'image_url',
        'thumbnail_url',
        'image_alt',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'seo_tags',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'category_product_maps', 'product_id', 'product_category_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'product_service_maps', 'product_id', 'service_id')
                    ->with('serviceCategory');
    }

    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_product_maps');
    }

    protected static function booted()
    {
        static::saving(function ($product) {
            $product->search_vector = DB::raw("to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))");
        });
    }
}
