<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use App\Mail\WelcomeEmail;
use App\Mail\BrochureDetailMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Brochure;

class BrochureController extends Controller
{
    /**
     * Handle the submission of a brochure form, create a client, and submit details to an external API.
     */
    public function create(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string',
            'countryCode' => 'required|string',
            'service' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'message' => 'string|nullable', // Ensure that message is nullable
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $brochure = $request->all();
        Mail::to('info@bl-india.com')->send(new BrochureDetailMail($brochure));
    
        // Check if the client exists
        $client = Client::where('email', $request->email)->first();
    
        if (!$client) {
            // Client does not exist, create a new one
            $password = Str::random(12); // Generate a random password
            $client = Client::create([
                'email' => $request->email,
                'name' => $request->name,
                'password' => Hash::make($password),
            ]);
            // Send welcome email with the new password
            Mail::to($client->email)->send(new WelcomeEmail($client, $password));
        }
    
        // Generate an OTP for the new or existing client
        $client->generateOtp();
    
        // Submit the brochure details to an external API
        $response = Http::post('https://pms.bl-india.com/api/erp/brochure/lead', $request->all());
    
        if ($response->successful()) {
            return response()->json([
                'status' => 'success',
                'client' => $client
            ], 201);
        }
    
        return response()->json(['error' => 'Failed to send brochure details to external API'], 500);
    }    

    public function verifyOtp(Request $request): JsonResponse
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

    public function brochures(Request $request): JsonResponse
    {
        $brochures = Brochure::all()->map(function($brochure) {
            $brochure->download_link = url('storage/' . $brochure->filename);
            return $brochure;
        });
    
        return response()->json($brochures);
    }
}
