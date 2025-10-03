import Tag from "@/components/Tag";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { MapPinIcon, StarIcon } from "@phosphor-icons/react";
import Button from "@/components/Buttons/Button";
import { NavLink } from "@/components/Navigation/NavLink";
import { usePropertiesUnlock } from "@/hooks/usePropertiesUnlock";
import PropertyPaywall from "@/components/PropertyPaywall";
import { useLocale, useTranslations } from "@/hooks/useLocalization";

interface Property {
    id: number;
    title: string;
    title_ar?: string;
    slug: string;
    property_type: string;
    property_category: string;
    property_description: string;
    description?: string;
    description_ar?: string;
    property_area: number;
    property_location: string;
    property_location_ar?: string;
    images: string[];
    price: number;
    advertising_license_number: string;
    pdf?: string;
    created_at: string;
    updated_at: string;
}

interface PropertyPageProps {
    property: Property;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function PropertyPage({ property }: PropertyPageProps) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string } | undefined;
    const { isUnlocked, unlockData, saveUnlockStatus, getRemainingDays } = usePropertiesUnlock();
    const { isArabic } = useLocale();
    const { t } = useTranslations('pages');

    const handleUnlock = (data: { name: string; phone: string; email: string }) => {
        // Save unlock status to localStorage
        saveUnlockStatus(data, property.id);
    };
    const formatPropertyType = (type: string) => {
        const translatedType = t(`property_type_${type}`);
        if (translatedType) return translatedType;
        
        const labels: { [key: string]: string } = {
            'sell': 'For Sale',
            'rent': 'For Rent',
            'investment': 'Investment',
            'share': 'Shared Ownership'
        };
        return labels[type] || type;
    };

    const formatPropertyDescription = (description: string) => {
        const translatedDescription = t(`property_description_${description}`);
        if (translatedDescription) return translatedDescription;
        
        return description.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const formatCapitalize = (text: string) => {
        const translatedCategory = t(`property_category_${text}`);
        if (translatedCategory) return translatedCategory;
        
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getGoogleMapsEmbedUrl = (locationUrl: string) => {
        // Extract coordinates from Google Maps URL or return embed URL
        const coordMatch = locationUrl.match(/q=([^&]+)/);
        if (coordMatch) {
            return `https://maps.google.com/maps?q=${coordMatch[1]}&z=15&output=embed`;
        }
        return locationUrl;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Reusable component for detail rows
    const DetailRow = ({ label, value, isLast = false, isLink = false, href = '' }: {
        label: string;
        value: string | React.ReactNode;
        isLast?: boolean;
        isLink?: boolean;
        href?: string;
    }) => (
        <div className={`flex py-6 items-center justify-between ${!isLast ? 'border-b border-ui-3' : ''}`}>
            <Text variant="bodyLarge" className="text-text-primary">{label}</Text>
            {isLink ? (
                <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                >
                    {value}
                </a>
            ) : (
                <Text variant="bodyMedium" className="text-text-secondary">{value}</Text>
            )}
        </div>
    );
    return (
        <AppLayout color='white' section='hero'>
            <Head title={`${isArabic && property.title_ar ? property.title_ar : property.title}`} />

            {/* Flash Messages */}
            {flash?.success && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    {flash.error}
                </div>
            )}

            {/* Hero */}
            <section id="hero" className="flex flex-col gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10 pb-24 w-full max-w-6xl">
                {/* Go Back */}
                <div className="flex justify-between items-center">
                    <div>
                        <NavLink href="/properties" className="text-text-primary" arrow={true}>{t('go_back') || 'Go Back'}</NavLink>
                    </div>
                    
                    {/* Unlock Status Indicator */}
                    {/* <UnlockStatusBanner compact /> */}
                </div>
                <Text variant="heading2" className="text-text-primary max-w-6xl" as="h1">
                    {isArabic && property.title_ar ? property.title_ar : property.title}
                </Text>
                <img 
                    src={property.images[0] || 'https://placehold.co/1200x500.png?text=No+Image'} 
                    alt={property.title} 
                    className="w-full max-w-6xl h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl" 
                />
                <div className="flex flex-col lg:flex-row w-full gap-6">
                    {/* Container */}
                    <div className="w-full h-fit gap-6 flex flex-col overflow-hidden">
                        {/* Property Type Tag */}
                        <Tag variant="secondary" text={formatPropertyType(property.property_type)} />
                        
                        {/* Location */}
                        <div className="flex gap-2.5 items-start">
                            <MapPinIcon size={20} className="mt-1 flex-shrink-0" />
                            <div className="flex flex-col gap-2">
                                <Text variant="bodyLarge" className="text-text-primary">{t('location') || 'Location'}</Text>
                                <Text variant="bodyMedium" className="text-text-secondary mb-2">
                                    {isArabic && property.property_location_ar ? property.property_location_ar : property.property_location}
                                </Text>
                                <a 
                                    href={property.property_location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    {t('view_on_maps') || 'View on Google Maps'}
                                </a>
                            </div>
                        </div>
                        
                        {/* Property Description - Limited Preview */}
                        {property.description && (
                            <div className="flex flex-col gap-4">
                                <Text variant="bodyLarge" className="text-text-primary">{t('description') || 'Description'}</Text>
                                {isUnlocked ? (
                                    <div 
                                        className="text-text-secondary prose prose-sm max-w-none [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-text-primary [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-text-primary [&>h3]:mt-3 [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-ui-3 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-text-secondary"
                                        dangerouslySetInnerHTML={{ __html: isArabic && property.description_ar ? property.description_ar : property.description }}
                                    />
                                ) : (
                                    <div 
                                        className="text-text-secondary prose prose-sm max-w-none relative [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-text-primary [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-text-primary [&>h3]:mt-3 [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-ui-3 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-text-secondary"
                                    >
                                        <div 
                                            className="max-h-24 overflow-hidden"
                                            dangerouslySetInnerHTML={{ __html: (isArabic && property.description_ar ? property.description_ar : property.description || '').substring(0, 150) + '...' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ui-2" />
                                    </div>
                                )}
                            </div>
                        )}
                        
                        
                        {/* Paywall Section */}
                        {!isUnlocked && (
                            <PropertyPaywall 
                                propertyId={property.id} 
                                onUnlock={handleUnlock} 
                            />
                        )}
                        
                        {/* Pricing - Only show when unlocked */}
                        {isUnlocked && (
                            <div className="flex gap-2.5 items-end">
                                <Text variant="heading3" className="text-text-primary">
                                    {Math.round(property.price).toLocaleString('en-US')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">{isArabic ? 'ر.س' : 'SAR'}</Text>
                            </div>
                        )}
                        
                        {/* CTA - Only show when unlocked */}
                        {isUnlocked && (
                            <Button text={t('request_quote') || 'Request a quote'} variant='secondary' href="/contact" />
                        )}
                    </div>

                    {/* Details - Only show when unlocked */}
                    {isUnlocked && (
                        <div className="w-full h-fit gap-6 flex flex-col p-4 sm:p-6 overflow-hidden bg-ui-2 border border-ui-3 rounded-2xl">
                            <Text variant="heading3" className="text-text-primary w-full">{t('details') || 'Details'}</Text>
                            <div className="flex flex-col gap-4">
                                <DetailRow 
                                    label={t('area') || 'Area'} 
                                    value={`${property.property_area} m²`} 
                                />
                                <DetailRow 
                                    label={t('type') || 'Type'} 
                                    value={formatPropertyDescription(property.property_description)} 
                                />
                                <DetailRow 
                                    label={t('category') || 'Category'} 
                                    value={formatCapitalize(property.property_category)} 
                                />
                                <DetailRow 
                                    label={t('license') || 'License'} 
                                    value={property.advertising_license_number} 
                                />
                                {property.pdf && (
                                    <DetailRow 
                                        label={t('documents') || 'Documents'} 
                                        value={t('view_pdf') || 'View PDF'}
                                        isLink={true}
                                        href={`/storage/${property.pdf}`}
                                    />
                                )}
                                <DetailRow 
                                    label={t('listed_date') || 'Listed Date'} 
                                    value={formatDate(property.created_at)}
                                    isLast={true}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Image Gallery - Only show when unlocked */}
                {isUnlocked && property.images.length > 1 && (
                    <div className="flex flex-col w-full gap-6 max-w-6xl">
                        <Text variant="heading3" className="text-text-primary">{t('gallery') || 'Gallery'}</Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {property.images.slice(1).map((image, index) => (
                                <img 
                                    key={index}
                                    src={image} 
                                    alt={`${property.title} - Image ${index + 2}`} 
                                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-2xl" 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Location Map - Only show when unlocked */}
                {isUnlocked && (
                    <div className="flex flex-col w-full gap-6 max-w-6xl">
                        <Text variant="heading3" className="text-text-primary">{t('location') || 'Location'}</Text>
                        <div className="w-full h-[400px] rounded-2xl overflow-hidden">
                            <iframe
                                src={getGoogleMapsEmbedUrl(property.property_location)}
                                style={{ height: '100%', width: '100%', border: '0px' }}
                                className="rounded-2xl"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Location of ${property.title}`}
                            />
                        </div>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}