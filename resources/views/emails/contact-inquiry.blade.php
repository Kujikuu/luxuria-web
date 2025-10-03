<x-mail::message>
# New Contact Inquiry

You have received a new contact inquiry from **{{ $inquiry->first_name }}**.

## Inquiry Details

**Request Type:** {{ ucfirst($inquiry->request_type) }}  
**Name:** {{ $inquiry->first_name }}  
**Phone:** {{ $inquiry->phone }}  
**Email:** {{ $inquiry->email }}  
**Date:** {{ $inquiry->created_at->format('F j, Y \a\t g:i A') }}

## Message

{{ $inquiry->message }}

<x-mail::button :url="url('/admin/contact-inquiries/' . $inquiry->id)">
View in Admin Panel
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
