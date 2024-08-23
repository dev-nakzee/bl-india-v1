<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use App\Mail\ResetPasswordMail;

class ClientController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $client->generateOtp();

        return response()->json(['message' => 'OTP sent to your email.'], 201);
    }

    public function verifyRegisterOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::where('email', $request->email)->firstOrFail();

        if ($client->verifyOtp($request->otp)) {
            $token = $client->createToken('client-token')->plainTextToken;
            return response()->json(['token' => $token, 'client' => $client], 200);
        } else {
            return response()->json(['message' => 'Invalid OTP or OTP expired.'], 401);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::where('email', $request->email)->first();

        if (!$client || !Hash::check($request->password, $client->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $client->generateOtp();

        return response()->json(['message' => 'OTP sent to your email.'], 200);
    }

    public function verifyLoginOtp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $client = Client::where('email', $request->email)->firstOrFail();

        if ($client->verifyOtp($request->otp)) {
            $token = $client->createToken('client-token')->plainTextToken;
            return response()->json(['token' => $token, 'client' => $client], 200);
        } else {
            return response()->json(['message' => 'Invalid OTP or OTP expired.'], 401);
        }
    }

    public function checkToken(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Token is valid'], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        $client = auth()->user();

        if (!Hash::check($request->current_password, $client->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $client->password = Hash::make($request->new_password);
        $client->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

   
    public function forgotPassword(Request $request): JsonResponse 
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $client = Client::where('email', $request->email)->first();
    
        if (!$client) {
            return response()->json(['message' => 'Email not found.'], 404);
        }
    
        try {
            // Generate a new token
            $token = Str::random(60);
    
            // Save the token in the password_resets table
            PasswordReset::updateOrCreate(
                ['email' => $client->email],
                [
                    'email' => $client->email,
                    'token' => $token,
                    'token_sent_at' => Carbon::now(),
                ]
            );

            // Create reset password URL
            $url = url('password-reset', $token);

            // Send the email with the reset link
            Mail::to($client->email)->send(new ResetPasswordMail($url, $client->name));
    
            return response()->json(['message' => 'Reset link sent to your email.']);
        } catch (\Exception $e) {
            // Log the exception message
            \Log::error('Error sending password reset link: ' . $e->getMessage());
    
            // Return a JSON response with the exception message
            return response()->json(['message' => 'Unable to send reset link.', 'error' => $e->getMessage()], 500);
        }
    }
    public function validateToken($token): JsonResponse
    {
        $passwordReset = PasswordReset::where('token', $token)->first();

        if (!$passwordReset || Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
            return response()->json(['message' => 'Invalid or expired token'], 404);
        }

        return response()->json(['email' => $passwordReset->email]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $passwordReset = PasswordReset::where('token', $request->token)
            ->where('email', $request->email)
            ->first();

        if (!$passwordReset || Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) {
            return response()->json(['message' => 'Invalid or expired token'], 404);
        }

        $client = Client::where('email', $request->email)->firstOrFail();
        $client->password = Hash::make($request->password);
        $client->save();

        // Delete the password reset record
        $passwordReset->delete();

        return response()->json(['message' => 'Password reset successfully']);
    }
}
