<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        $customers = Customer::all();
        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_alt' => 'nullable|string',
        ]);

        $customer = new Customer();
        $customer->name = $request->name;
        $customer->image_alt = $request->image_alt;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $customer->image_url = '/storage/' . $imagePath;
        }

        $customer->save();

        return response()->json($customer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update1(Request $request, string $id)
    {
        //
        $customer = Customer::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_alt' => 'nullable|string',
        ]);

        $customer->name = $request->name;
        $customer->image_alt = $request->image_alt;

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($customer->image_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $customer->image_url));
            }
            $imagePath = $request->file('image')->store('images', 'public');
            $customer->image_url = '/storage/' . $imagePath;
        }

        $customer->save();

        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $customer = Customer::findOrFail($id);
        if ($customer->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $customer->image_url));
        }
        $customer->delete();
        return response()->json(null, 204);
    }
}
