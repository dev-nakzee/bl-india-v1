<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'slug',
        'tagline',
        'image_url',
        'thumbnail_url',
        'image_alt',
        'description',
        'compliance_header',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'seo_tags',
        'is_global',
        'service_category_id',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    protected $casts = [
        'is_global' => 'boolean',
    ];
    
    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    public function serviceSections()
    {
        return $this->hasMany(ServiceSection::class);
    }
}
