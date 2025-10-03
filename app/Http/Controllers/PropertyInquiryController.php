<?php

namespace App\Http\Controllers;

use App\Mail\PropertyInquiryNotification;
use App\Models\Property;
use App\Models\PropertyInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PropertyInquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $inquiry = PropertyInquiry::create([
            'property_id' => $validated['property_id'],
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'viewed_at' => now(),
        ]);

        // Load the property relationship
        $inquiry->load('property');

        // Send email notification
        try {
            Mail::to(config('mail.admin_email', 'admin@luxuria.com'))
                ->send(new PropertyInquiryNotification($inquiry));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send property inquiry email: '.$e->getMessage());
        }

        // Find the property to get its slug for redirect
        $property = Property::find($validated['property_id']);

        // Return back to the same property page with success message
        return redirect()->route('properties.show', $property->slug)
            ->with('success', 'Thank you! Your inquiry has been submitted successfully. You now have access to all property details for 30 days.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyInquiry $propertyInquiry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PropertyInquiry $propertyInquiry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PropertyInquiry $propertyInquiry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyInquiry $propertyInquiry)
    {
        //
    }
}
