<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use App\Models\ScheduleCall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class ScheduleCallController extends Controller
{
    /**
     * Store a newly created scheduled call in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'countryCode' => 'required|string|max:10',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'schedule' => 'required|date|after:now',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = [
            'name' => $request->name,
            'country_code' => $request->countryCode,
            'phone' => $request->phone,
            'email' => $request->email,
            'scheduled_at' => $request->schedule,
        ];

        $scheduleCall = ScheduleCall::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'country_code' => $request->countryCode,
                'phone' => $request->phone,
                'scheduled_at' => $request->schedule,
            ]
        );
        $scheduleCall->generateOtp();
        $response = Http::post('https://pms.bl-india.com/api/erp/test', $request->all());
        return response()->json(['message' => 'Scheduled call created successfully.'], 201);
    }

    /**
     * Verify the provided OTP.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|string|max:6',
            'email' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $scheduleCall = ScheduleCall::where('email', $request->email)->firstOrFail();

        if ($scheduleCall->verifyOtp($request->input('otp'))) {
            return response()->json(['message' => 'OTP verified successfully.']);
        }

        return response()->json(['message' => 'Invalid OTP or OTP expired.'], 400);
    }
}
