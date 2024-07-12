<?php
// app/Models/Client.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;

class Client extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'email_token',
        'email_token_sent_at',
        'email_verified_at',
        'email_otp',
        'email_otp_sent_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'email_token',
        'email_otp',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'email_token_sent_at' => 'datetime',
        'email_otp_sent_at' => 'datetime',
    ];

    public function generateOtp()
    {
        $otp = rand(100000, 999999);
        $this->email_otp = $otp;
        $this->email_otp_sent_at = now();
        $this->save();
        
        // Send OTP via email
        Mail::to($this->email)->send(new SendOtpMail($otp));
    }

    public function verifyOtp($otp)
    {
        if ($this->email_otp === $otp && $this->email_otp_sent_at->diffInMinutes(now()) <= 10) {
            $this->email_verified_at = now();
            $this->email_otp = null;
            $this->email_otp_sent_at = null;
            $this->save();
            return true;
        }
        return false;
    }
}
