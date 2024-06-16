<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;
    
            return response()->json([
                'token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }
    
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();
        if ($user) {
            $user->tokens()->delete();
            $user->update(['status' => 'Offline']);
        }

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function checkTokenValidity(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Token is valid'], 200);
    }
}
