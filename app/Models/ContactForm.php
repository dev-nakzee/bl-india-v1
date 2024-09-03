<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactForm extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'country_code',
        'phone',
        'organization',
        'message',
        'file_url', // Optional file upload field, add this to your migration and update the model'sfillable array
    ];

    // Optionally, if you want to hide certain attributes when serializing the model
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
