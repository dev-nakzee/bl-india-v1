<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brochure;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class BrochureController extends Controller
{
    /**
     * Display a listing of the brochures.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $brochures = Brochure::with('service')->get();
        return response()->json($brochures);
    }

    /**
     * Store a newly created brochure in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'filename' => 'required|file|mimes:pdf',
            'service_id' => 'required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $filePath = Storage::disk('public')->putFile('brochures', $request->file('filename'));

        $brochure = Brochure::create([
            'title' => $request->title,
            'filename' => $filePath,
            'service_id' => $request->service_id,
        ]);

        return response()->json($brochure, 201);
    }

    /**
     * Display the specified brochure.
     *
     * @param  \App\Models\Brochure  $brochure
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Brochure $brochure)
    {
        return response()->json($brochure);
    }

    /**
     * Update the specified brochure in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brochure  $brochure
     * @return \Illuminate\Http\JsonResponse
     */
    public function update1(Request $request, Brochure $brochure)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'filename' => 'sometimes|required|file|mimes:pdf,doc,docx',
            'service_id' => 'sometimes|required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('filename')) {
            Storage::delete($brochure->filename);
            $filePath = $request->file('filename')->store('brochures');
            $brochure->filename = $filePath;
        }

        $brochure->update($request->only(['title', 'service_id']));

        return response()->json($brochure);
    }

    /**
     * Remove the specified brochure from storage.
     *
     * @param  \App\Models\Brochure  $brochure
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Brochure $brochure)
    {
        Storage::delete($brochure->filename);
        $brochure->delete();
        return response()->json(['message' => 'Brochure deleted successfully']);
    }
}