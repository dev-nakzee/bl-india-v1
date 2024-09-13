<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Contact;
use App\Models\ContactForm;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\ThankYouMail;
use App\Mail\ContactFormNotificationMail;

class ContactController extends Controller
{
    public function contact(): JsonResponse
    {
        $page = Page::where('slug', 'contact')->first();
        $contact = Contact::first();
        return response()->json([
            'page' => $page,
            'contact' => $contact
        ]);
    }

    public function contactForm(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'country_code' => 'required|string',
            'phone' => 'required|string',
            'organization' => 'string|nullable',
            'message' => 'string|nullable',
            'file' => 'nullable|file|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('contact_forms', 'public');
            $validatedData['file_url'] = Storage::url($filePath);
        }

        $contactForm = ContactForm::create($validatedData);

        Mail::to($contactForm->email)->send(new ThankYouMail($contactForm));
        Mail::to('info@bl-india.com')->send(new ContactFormNotificationMail($contactForm));
        $response = Http::post('https://pms.bl-india.com/api/erp/test', $request->all());
        if ($response->successful()) {
            return response()->json(['message' => 'Thank you for your message. We will get back to you shortly.']);
        }
        
        return response()->json(['error' => 'Failed to send contact details to external API'], 500);
    }

}
