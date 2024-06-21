<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Notification;
use App\Models\NotificationCategory;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    //
    public function notifications(): JsonResponse
    {
        $page = Page::where('slug', 'notifications')->get();
        $notifications = Notification::orderBy('id')->with('category', 'products.name', 'products.slug')->limit(3)->get();
        $categories = NotificationCategory::orderBy('id', 'asc')->get();
        return response()->json([
            'page' => $page,
            'notifications' => $notifications,
            'categories' => $categories,
        ]);
    }
}
