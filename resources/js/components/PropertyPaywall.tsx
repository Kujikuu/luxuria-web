import { Text } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/hooks/useLocalization';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { StarIcon } from '@phosphor-icons/react';

interface PropertyPaywallProps {
    propertyId: number;
    onUnlock: (data: { name: string; phone: string; email: string }) => void;
}

export default function PropertyPaywall({ propertyId, onUnlock }: PropertyPaywallProps) {
    const { t, isRtl } = useTranslations('components');
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
            },
        });
    };

    return (
        <div className="my-6 flex flex-col gap-8 rounded-2xl border-2 border-ui-3 bg-gradient-to-br from-ui-2 to-ui-1 p-8">
            <div className="flex flex-col gap-6 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-text-primary p-4">
                        <StarIcon size={32} className="text-ui-1" />
                    </div>
                </div>
                <Text variant="heading3" className={`text-text-primary ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t('paywall_title') || 'Please add your details to unlock this property'}
                </Text>
                {/* <Text variant="bodyLarge" className="text-text-secondary max-w-md mx-auto">
                    Get instant access to this property and ALL future property details for 30 days. View pricing, full descriptions, image galleries, location maps, and contact information.
                </Text>
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                    <Text variant="bodySmall" className="text-yellow-800 font-medium">
                        🎉 One-time unlock gives you access to all properties!
                    </Text>
                </div> */}
            </div>

            {/* Benefits */}
            {/* <div className="flex flex-col gap-4">
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
            </div> */}

            {/* Unlock Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                    <Input
                        type="text"
                        placeholder={t('name_placeholder') || 'Your name *'}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={cn(
                            'h-12 rounded-xl border-ui-3 bg-ui-1 px-4 py-3 text-text-primary placeholder:text-text-secondary focus-visible:border-text-primary focus-visible:ring-text-primary/20',
                            isRtl ? 'text-right' : 'text-left',
                        )}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        aria-invalid={!!errors.name}
                        required
                    />
                    {errors.name && (
                        <Text variant="bodySmall" className={`text-red-500 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {errors.name}
                        </Text>
                    )}

                    <Input
                        type="tel"
                        placeholder={t('phone_placeholder') || 'Your phone number *'}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={cn(
                            'h-12 rounded-xl border-ui-3 bg-ui-1 px-4 py-3 text-text-primary placeholder:text-text-secondary focus-visible:border-text-primary focus-visible:ring-text-primary/20',
                            isRtl ? 'text-right' : 'text-left',
                        )}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        aria-invalid={!!errors.phone}
                        required
                    />
                    {errors.phone && (
                        <Text variant="bodySmall" className={`text-red-500 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {errors.phone}
                        </Text>
                    )}

                    <Input
                        type="email"
                        placeholder={t('email_placeholder') || 'Your email (optional)'}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={cn(
                            'h-12 rounded-xl border-ui-3 bg-ui-1 px-4 py-3 text-text-primary placeholder:text-text-secondary focus-visible:border-text-primary focus-visible:ring-text-primary/20',
                            isRtl ? 'text-right' : 'text-left',
                        )}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                        <Text variant="bodySmall" className={`text-red-500 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {errors.email}
                        </Text>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={processing || !data.name.trim() || !data.phone.trim()}
                    className="h-12 w-full rounded-xl bg-text-primary px-6 py-3 text-ui-1 hover:bg-text-primary/90"
                >
                    {processing ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-ui-1 border-t-transparent"></div>
                            {t('submitting') || 'Submitting...'}
                        </>
                    ) : (
                        t('unlock') || 'Unlock'
                    )}
                </Button>
            </form>
        </div>
    );
}
