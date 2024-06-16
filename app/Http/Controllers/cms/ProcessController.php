<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Process;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $processes = Process::orderBy('id')->get();
        return response()->json($processes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'required|string|max:255',
            'text' => 'required|string',
        ]);

        $process = Process::create($validated);

        return response()->json($process, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        //
        $process = Process::findOrFail($id);
        return response()->json($process);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        //
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'order' => 'sometimes|required|string|max:255',
            'text' => 'sometimes|required|string',
        ]);

        $process = Process::findOrFail($id);
        $process->update($validated);

        return response()->json($process, 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        //
        $process = Process::findOrFail($id);
        $process->delete();

        return response()->json(null, 204);
    }
}
