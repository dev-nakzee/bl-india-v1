<?php

namespace App\Http\Controllers\fe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Contact;
use App\Models\ContactForm;
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
            'name' =>'required|string',
            'email' =>'required|email',
            'country_code' =>'required|string',
            'phone' =>'required|string',
            'organization' =>'string|nullable',
            'message' =>'string|nullable',
        ]);

        $contactForm = ContactForm::create($validatedData);

        // Send thank you email to the form filler
        Mail::to($contactForm->email)->send(new ThankYouMail($contactForm));

        // Send notification email to info@bl-india.com
        Mail::to('info@bl-india.com')->send(new ContactFormNotificationMail($contactForm));

        return response()->json(['message' => 'Thank you for your message. We will get back to you shortly.']);
    }
}
