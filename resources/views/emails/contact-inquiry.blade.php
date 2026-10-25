<x-mail::message>
# New Luxuria Lead

You have received a new lead from **{{ trim($inquiry->first_name.' '.$inquiry->last_name) }}**.

## Inquiry Details

**Lead Type:** {{ $inquiry->typeLabel('en') }}<br>
**Name:** {{ trim($inquiry->first_name.' '.$inquiry->last_name) }}<br>
**Phone:** {{ $inquiry->phone }}  
**Email:** {{ $inquiry->email }}  
**Date:** {{ $inquiry->created_at->format('F j, Y \a\t g:i A') }}

**Approval:** Pending review in Luxuria. No Hub transfer has been made.

## Message

{{ $inquiry->message }}

<x-mail::button :url="url('/admin/contact-inquiries/' . $inquiry->id . '/edit')">
View in Admin Panel
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
