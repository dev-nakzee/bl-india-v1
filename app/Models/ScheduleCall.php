<?php

namespace App\Models;

use App\Mail\SendOtpMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Mail;

class ScheduleCall extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'country_code',
        'phone',
        'email',
        'scheduled_at',
        'otp',
        'otp_sent_at',
        'verified_at',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'otp_sent_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
        'otp',
        'otp_sent_at',
    ];

    public function generateOtp()
    {
        $otp = rand(100000, 999999);
        $this->otp = $otp;
        $this->otp_sent_at = now();
        $this->save();
        
        $name = $this->name;
        // Send OTP via email
        Mail::to($this->email)->send(new SendOtpMail($otp, $name));
    }

    public function verifyOtp($otp)
    {
        if ($this->otp === $otp && $this->otp_sent_at->diffInMinutes(now()) <= 10) {
            $this->verified_at = now();
            $this->otp = null;
            $this->otp_sent_at = null;
            $this->save();
            return true;
        }
        return false;
    }
}
