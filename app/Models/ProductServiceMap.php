<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;

class ProductServiceMap extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'service_id',
        'is',
        'group',
        'scheme',
        'others',
        'is_mandatory',
        'details',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
