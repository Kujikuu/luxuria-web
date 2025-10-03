import { Text } from "@/components/Typography";
import { StarIcon } from "@phosphor-icons/react";
import { useForm } from "@inertiajs/react";

interface PropertyPaywallProps {
    propertyId: number;
    onUnlock: (data: { name: string; phone: string; email: string }) => void;
}

export default function PropertyPaywall({ propertyId, onUnlock }: PropertyPaywallProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        property_id: propertyId,
        name: '',
        phone: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Call the parent's unlock handler
        onUnlock({
            name: data.name,
            phone: data.phone,
            email: data.email,
        });
        
        // Submit the form
        post('/property-inquiries', {
            onSuccess: () => {
                // Form submission successful
                reset('name', 'phone', 'email');
            },
            onError: (errors) => {
                console.error('Form submission error:', errors);
            }
        });
    };

    return (
        <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-ui-2 to-ui-1 border-2 border-ui-3 rounded-2xl my-6">
            <div className="flex flex-col gap-6 text-center">
                <div className="flex justify-center">
                    <div className="p-4 bg-text-primary rounded-full">
                        <StarIcon size={32} className="text-ui-1" />
                    </div>
                </div>
                <Text variant="heading3" className="text-text-primary">
                    Unlock ALL property details for 30 days
                </Text>
                <Text variant="bodyLarge" className="text-text-secondary max-w-md mx-auto">
                    Get instant access to this property and ALL future property details for 30 days. View pricing, full descriptions, image galleries, location maps, and contact information.
                </Text>
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                    <Text variant="bodySmall" className="text-yellow-800 font-medium">
                        🎉 One-time unlock gives you access to all properties!
                    </Text>
                </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text-primary rounded-full flex-shrink-0"></div>
                    <Text variant="bodyMedium" className="text-text-secondary">View complete pricing for ALL properties</Text>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text-primary rounded-full flex-shrink-0"></div>
                    <Text variant="bodyMedium" className="text-text-secondary">Access full image galleries and floor plans</Text>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text-primary rounded-full flex-shrink-0"></div>
                    <Text variant="bodyMedium" className="text-text-secondary">View exact locations and interactive maps</Text>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text-primary rounded-full flex-shrink-0"></div>
                    <Text variant="bodyMedium" className="text-text-secondary">Get direct contact for ALL property inquiries</Text>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text-primary rounded-full flex-shrink-0"></div>
                    <Text variant="bodyMedium" className="text-text-secondary">30 days unlimited access to all future listings</Text>
                </div>
            </div>

            {/* Unlock Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Your name *"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`px-4 py-3 border rounded-xl bg-ui-1 text-text-primary placeholder-text-secondary focus:outline-none focus:border-text-primary transition-colors ${errors.name ? 'border-red-500' : 'border-ui-3'}`}
                        required
                    />
                    {errors.name && <Text variant="bodySmall" className="text-red-500">{errors.name}</Text>}
                    
                    <input
                        type="tel"
                        placeholder="Your phone number *"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`px-4 py-3 border rounded-xl bg-ui-1 text-text-primary placeholder-text-secondary focus:outline-none focus:border-text-primary transition-colors ${errors.phone ? 'border-red-500' : 'border-ui-3'}`}
                        required
                    />
                    {errors.phone && <Text variant="bodySmall" className="text-red-500">{errors.phone}</Text>}
                    
                    <input
                        type="email"
                        placeholder="Your email (optional)"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`px-4 py-3 border rounded-xl bg-ui-1 text-text-primary placeholder-text-secondary focus:outline-none focus:border-text-primary transition-colors ${errors.email ? 'border-red-500' : 'border-ui-3'}`}
                    />
                    {errors.email && <Text variant="bodySmall" className="text-red-500">{errors.email}</Text>}
                </div>
                <button 
                    type="submit"
                    disabled={processing || !data.name.trim() || !data.phone.trim()}
                    className="px-6 py-3 bg-text-primary text-ui-1 rounded-xl font-medium hover:bg-text-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full flex items-center justify-center gap-2"
                >
                    {processing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-ui-1 border-t-transparent"></div>
                            Submitting...
                        </>
                    ) : (
                        'Unlock Property Details'
                    )}
                </button>
            </form>
        </div>
    );
}