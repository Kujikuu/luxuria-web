<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactInquiryRequest;
use App\Mail\ContactInquiryNotification;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): RedirectResponse
    {
        // Create the contact inquiry
        $inquiry = ContactInquiry::create($request->validated());

        // Send email notification to admin
        Mail::to(config('mail.admin_email', 'admin@luxuria.sa'))
            ->send(new ContactInquiryNotification($inquiry));

        // Redirect back with success message
        return back()->with('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
    }
}
