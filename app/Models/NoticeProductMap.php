<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoticeProductMap extends Model
{
    use HasFactory;
    protected $table = 'notification_product_maps';
    protected $fillable = [
        'notification_id',
        'product_id',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function notification()
    {
        return $this->belongsTo(Notification::class, 'notification_id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
