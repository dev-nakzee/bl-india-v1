<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Holiday;
use Illuminate\Http\JsonResponse;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $holidays = Holiday::all();
        return response()->json($holidays);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' =>'required|string|max:255',
            'date' =>'required|date',
            'holiday_type' =>'required|string|max:255',
        ]);

        $holiday = Holiday::create($validated);

        return response()->json($holiday, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $holiday = Holiday::findOrFail($id);
        return response()->json($holiday);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $holiday = Holiday::findOrFail($id);

        $validated = $request->validate([
            'title' =>'required|string|max:255',
            'date' =>'required|date',
            'holiday_type' =>'required|string|max:255',
        ]);

        $holiday->update($validated);
        return response()->json($holiday, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $holiday = Holiday::findOrFail($id);
        $holiday->delete();
        return response()->json(null, 204);
    }
}
