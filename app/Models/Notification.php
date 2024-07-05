<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'notification_category_id',
        'name',
        'technical_name',
        'slug',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'seo_tags',
        'file_url',
        'content',
        'date',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function category()
    {
        return $this->belongsTo(NotificationCategory::class, 'notification_category_id');
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'notification_product_maps');
    }
}
