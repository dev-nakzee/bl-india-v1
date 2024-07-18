<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    protected $primaryKey = 'email'; // Set primary key
    public $incrementing = false; // Disable auto-incrementing
    
    protected $fillable = [
        'email',
        'token',
        'token_sent_at',
    ];
    protected $dates = [
        'token_sent_at',
    ];
}
