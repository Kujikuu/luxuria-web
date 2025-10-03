<x-mail::message>
# New Property Inquiry

You have received a new property inquiry from **{{ $inquiry->name }}**.

## Property Details

**Title:** {{ $inquiry->property->title }}  
**Type:** {{ ucfirst(str_replace('_', ' ', $inquiry->property->property_type)) }}  
**Category:** {{ ucfirst($inquiry->property->property_category) }}  
**Price:** {{ number_format($inquiry->property->price, 0) }} SAR  
**License:** {{ $inquiry->property->advertising_license_number }}

## Client Information

**Name:** {{ $inquiry->name }}  
**Phone:** {{ $inquiry->phone }}  
@if($inquiry->email)
**Email:** {{ $inquiry->email }}  
@endif
**Inquiry Date:** {{ $inquiry->viewed_at->format('F j, Y \a\t g:i A') }}  
**IP Address:** {{ $inquiry->ip_address ?? 'N/A' }}

<x-mail::button :url="url('/admin/property-inquiries/' . $inquiry->id)">
View in Admin Panel
</x-mail::button>

<x-mail::button :url="url('/properties/' . $inquiry->property->slug)" color="success">
View Property Page
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>