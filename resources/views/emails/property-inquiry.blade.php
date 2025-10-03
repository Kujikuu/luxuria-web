<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Property Inquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .property-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .inquiry-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 New Property Inquiry</h1>
            <p>Someone is interested in viewing property details</p>
        </div>
        
        <div class="content">
            <div class="property-info">
                <h2>Property Information</h2>
                <div class="detail-row">
                    <span class="label">Title:</span>
                    <span>{{ $inquiry->property->title }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Type:</span>
                    <span>{{ ucfirst(str_replace('_', ' ', $inquiry->property->property_type)) }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Category:</span>
                    <span>{{ ucfirst($inquiry->property->property_category) }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Price:</span>
                    <span>{{ number_format($inquiry->property->price, 0) }} SAR</span>
                </div>
                <div class="detail-row">
                    <span class="label">License:</span>
                    <span>{{ $inquiry->property->advertising_license_number }}</span>
                </div>
            </div>

            <div class="inquiry-details">
                <h2>Client Information</h2>
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span>{{ $inquiry->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span>{{ $inquiry->phone }}</span>
                </div>
                @if($inquiry->email)
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span>{{ $inquiry->email }}</span>
                </div>
                @endif
                <div class="detail-row">
                    <span class="label">Inquiry Date:</span>
                    <span>{{ $inquiry->viewed_at->format('M d, Y at H:i') }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">IP Address:</span>
                    <span>{{ $inquiry->ip_address ?? 'N/A' }}</span>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="{{ url('/admin/property-inquiries/' . $inquiry->id) }}" class="btn">
                    View in Admin Panel
                </a>
                <br>
                <a href="{{ url('/properties/' . $inquiry->property->slug) }}" class="btn" style="background: #059669;">
                    View Property Page
                </a>
            </div>
        </div>

        <div class="footer">
            <p>This inquiry was submitted through your property listing website.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}</p>
        </div>
    </div>
</body>
</html>