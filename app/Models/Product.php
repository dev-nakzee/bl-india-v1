<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        // 'product_category_id',
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
        return $this->hasMany(ProductServiceMap::class);
    }
    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_product_maps');
    }
}
