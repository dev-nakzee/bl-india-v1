<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DownloadFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'download_id',
        'name',
        'file_url',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function download()
    {
        return $this->belongsTo(Download::class, 'download_id');
    }
}
