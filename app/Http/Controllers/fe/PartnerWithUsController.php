<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PartnerWithUs;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class PartnerWithUsController extends Controller
{
    /**
     * Store a new PartnerWithUs form submission.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'country_code' => 'required|string|max:10',
            'phone' => 'required|string|max:20',
            'partner_type' => 'required|in:Service Partner,Channel Partner',
            'entity_type' => 'required|in:Company,Individual',
            'organization' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'field_of_expertise' => 'nullable|string|max:255',
            'year_of_experience' => 'nullable|string|max:255',
        ]);

        // If validation fails, return a JSON response with the errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new PartnerWithUs record
        $partnerWithUs = PartnerWithUs::create($request->all());

        // Return a success response
        return response()->json(['message' => 'Form submitted successfully', 'data' => $partnerWithUs], 201);
    }
}
