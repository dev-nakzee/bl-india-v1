<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerWithUs extends Model
{
    use HasFactory;

    protected $table = 'partner_with_us';

    protected $fillable = [
        'name',
        'email',
        'country_code',
        'phone',
        'partner_type',
        'entity_type',
        'organization',
        'designation',
        'field_of_expertise',
        'year_of_experience',
    ];
}
