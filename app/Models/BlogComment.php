<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'blog_id',
        'client_id',
        'comments',
        'is_approved',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
