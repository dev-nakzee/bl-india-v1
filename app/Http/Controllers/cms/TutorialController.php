<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tutorial;
use Illuminate\Http\JsonResponse;

class TutorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $tutorials = Tutorial::all();
        return response()->json($tutorials);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'required|url',
            'description' => 'required|string',
        ]);

        $tutorial = Tutorial::create($request->all());
        return response()->json($tutorial, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $tutorial = Tutorial::findOrFail($id);
        return response()->json($tutorial);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'video_url' => 'sometimes|required|url',
            'description' => 'sometimes|required|string',
        ]);

        $tutorial = Tutorial::findOrFail($id);
        $tutorial->update($request->all());
        return response()->json($tutorial, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $tutorial = Tutorial::findOrFail($id);
        $tutorial->delete();
        return response()->json(null, 204);
    }
}
