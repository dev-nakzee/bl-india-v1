<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    //
    public function contact(): JsonResponse
    {
        $page = Page::where('slug', 'contact')->first();
        $contact = Contact::first();
        return response()->json([
            'page' => $page,
            'contact' => $contact
        ]);
    }
}
