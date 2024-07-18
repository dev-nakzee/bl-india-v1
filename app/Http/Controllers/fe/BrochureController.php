<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class BrochureController extends Controller
{
    /**
     * Handle the submission of a brochure form, create a client, and submit details to an external API.
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string',
            'countryCode' => 'required|string',
            'service' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a client record if it does not exist
        $client = Client::firstOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'password' => Hash::make('defaultPassword'), // You might want to generate a random password or send a link for setting it
            ]
        );

        // Generate an OTP for the new or existing client
        $client->generateOtp();

        // Submit the brochure details to an external API
        $response = Http::post('https://pms.bl-india.com/api/lead', $request->all());

        if ($response->successful()) {
            // Optionally send a confirmation or welcome email with the OTP
            return response()->json([
                'status' => 'success',
                'client' => $client
            ], 201);
        }

        return response()->json(['error' => 'Failed to send brochure details to external API'], 500);
    }

    public function verifyOtp(Request $request)
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
}
