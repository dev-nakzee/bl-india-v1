<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tutorial;
use Illuminate\Http\JsonResponse;

class TutorialController extends Controller
{
    //
    public function tutorials(): JsonResponse
    {
        $tutorials = Tutorial::all();
        return response()->json($tutorials);
    }
}
