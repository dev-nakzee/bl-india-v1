<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use App\Models\Process;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'process_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

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
    public function update1(Request $request, string $id): JsonResponse
    {
        //
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'order' => 'sometimes|required|string|max:255',
            'text' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_alt' => 'nullable|string|max:255',
        ]);

        $process = Process::findOrFail($id);

        if ($request->hasFile('image')) {
            if ($process->image_url) {
                Storage::disk('public')->delete($process->image_url);
            }
            try {
                
                $imageWebp  = Image::read($request->file('image'));
                $image = $imageWebp->toWebp(100);
                $imageName = uniqid().'.webp';

                // Convert and store original image as WebP
                $imagePath = 'process_images/' . $imageName;
                Storage::disk('public')->put($imagePath, (string) $image);
                $validated['image_url'] = Storage::url($imagePath);

            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }
        }

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
