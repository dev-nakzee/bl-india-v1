<?php

namespace App\Http\Controllers\cms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;


class SiteSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siteSettings = SiteSetting::all();
        return response()->json($siteSettings);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $siteSetting = SiteSetting::findOrFail($id);

        if (in_array($siteSetting->name, ['logo', 'site_icon'])) {
            $validator = Validator::make($request->all(), [
                'value' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $image  = Image::read($request->file('value'));

            if ($siteSetting->name === 'logo') {
                $image = $image->resize(700, 175);
                $image = $image->toWebp(100);
                $imageName = $siteSetting->name . '.webp';
                Storage::put('public/site_settings/' . $imageName, (string) $image);
                $url = Storage::url('public/site_settings/' . $imageName);
                $siteSetting->value = $url;
            } elseif ($siteSetting->name === 'site_icon') {
                $sizes = [
                    ['size' => '57x57', 'type' => 'apple-touch-icon'],
                    ['size' => '60x60', 'type' => 'apple-touch-icon'],
                    ['size' => '72x72', 'type' => 'apple-touch-icon'],
                    ['size' => '76x76', 'type' => 'apple-touch-icon'],
                    ['size' => '114x114', 'type' => 'apple-touch-icon'],
                    ['size' => '120x120', 'type' => 'apple-touch-icon'],
                    ['size' => '144x144', 'type' => 'apple-touch-icon'],
                    ['size' => '152x152', 'type' => 'apple-touch-icon'],
                    ['size' => '180x180', 'type' => 'apple-touch-icon'],
                    ['size' => '36x36', 'type' => 'icon'],
                    ['size' => '48x48', 'type' => 'icon'],
                    ['size' => '72x72', 'type' => 'icon'],
                    ['size' => '96x96', 'type' => 'icon'],
                    ['size' => '144x144', 'type' => 'icon'],
                    ['size' => '192x192', 'type' => 'icon'],
                    ['size' => '32x32', 'type' => 'icon'],
                    ['size' => '96x96', 'type' => 'icon'],
                    ['size' => '16x16', 'type' => 'icon'],
                ];

                foreach ($sizes as $size) {
                    [$width, $height] = explode('x', $size['size']);
                    $resizedImage = $image->resize($width, $height);
                    $resizedImage = $resizedImage->toWebp(100);
                    $imageName = "{$siteSetting->name}-{$size['size']}.webp";
                    Storage::put('public/site_settings/' . $imageName, (string) $resizedImage);
                }
                // Set the value to the path of one of the icons, e.g., 32x32 size
                $url = Storage::url('public/site_settings/site_icon-32x32.webp');
                $siteSetting->value = $url;
            }
        } else {
            $validator = Validator::make($request->all(), [
                'value' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $siteSetting->value = $request->input('value');
        }

        $siteSetting->save();

        return response()->json(['message' => 'Setting updated successfully.', 'siteSetting' => $siteSetting]);
    }
}
