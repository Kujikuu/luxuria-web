<?php

namespace App\Http\Controllers;

use App\Helpers\ContactPhone;
use App\Http\Requests\StoreContactInquiryRequest;
use App\Mail\ContactInquiryNotification;
use App\Models\ContactInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): RedirectResponse
    {
        $inquiry = ContactInquiry::create([
            ...$request->safe()->except('consent'),
            'phone' => ContactPhone::normalize($request->validated('phone')),
            'locale' => app()->getLocale(),
            'consented_at' => now(),
        ]);

        // Send email notification to admin
        Mail::to(config('mail.admin_email', 'admin@luxuria.sa'))
            ->queue(new ContactInquiryNotification($inquiry));

        // Redirect back with success message
        return back()->with('success', __('pages.contact_lead_success'));
    }
}
