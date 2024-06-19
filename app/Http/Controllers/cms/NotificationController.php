<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('category')->get();
        return response()->json($notifications);
    }

    public function show($id)
    {
        $notification = Notification::with('category')->findOrFail($id);
        return response()->json($notification);
    }

    public function store(Request $request)
    {
        $request->validate([
            'notification_category_id' => 'required|exists:notification_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:notifications,slug',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'file_url' => 'nullable|file|mimes:pdf|max:2048', // max 2MB
            'content' => 'nullable|string',
            'date' => 'required|date', // Add validation rule for date
        ]);

        $data = $request->except('file_url');
        if ($request->hasFile('file_url')) {
            $filePath = $request->file('file_url')->store('notifications', 'public');
            $data['file_url'] = Storage::url($filePath);
        }

        $notification = Notification::create($data);
        return response()->json($notification, 201);
    }

    public function update1(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);

        $request->validate([
            'notification_category_id' => 'required|exists:notification_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:notifications,slug,' . $id,
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string',
            'seo_tags' => 'nullable|string',
            'file_url' => 'nullable|file|mimes:pdf|max:2048', // max 2MB
            'content' => 'nullable|string',
            'date' => 'required|date', // Add validation rule for date
        ]);

        $data = $request->except('file_url');
        if ($request->hasFile('file_url')) {
            // Delete the old file if exists
            if ($notification->file_url) {
                $oldFilePath = str_replace('/storage/', '', $notification->file_url);
                Storage::disk('public')->delete($oldFilePath);
            }

            $filePath = $request->file('file_url')->store('notifications', 'public');
            $data['file_url'] = Storage::url($filePath);
        }

        $notification->update($data);
        return response()->json($notification);
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        
        // Delete the associated file if exists
        if ($notification->file_url) {
            $filePath = str_replace('/storage/', '', $notification->file_url);
            Storage::disk('public')->delete($filePath);
        }

        $notification->delete();
        return response()->json(null, 204);
    }
}