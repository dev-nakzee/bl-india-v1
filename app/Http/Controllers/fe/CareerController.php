<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;

class CareerController extends Controller
{
    //
    public function careers()
    {
        $page = Page::where('slug', 'career')->first();
        return response()->json($page);
    }
}
