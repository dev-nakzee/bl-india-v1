<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'order',
        'text',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
