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
        'tagline',
        'technical_name',
        'description',
        'image_url',
        'thumbnail_url',
        'image_alt',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'seo_tags',
        'product_category_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function services()
    {
        return $this->hasMany(ProductServiceMap::class);
    }
}
