import Tag from "@/components/Tag";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { MapPinIcon } from "@phosphor-icons/react";
import Button from "@/components/Buttons/Button";
import { NavLink } from "@/components/Navigation/NavLink";

interface Property {
    id: number;
    title: string;
    slug: string;
    property_type: string;
    property_category: string;
    property_description: string;
    description?: string;
    property_area: number;
    property_location: string;
    images: string[];
    price: number;
    advertising_license_number: string;
    pdf?: string;
    created_at: string;
    updated_at: string;
}

interface PropertyPageProps {
    property: Property;
}

export default function PropertyPage({ property }: PropertyPageProps) {
    const formatPropertyType = (type: string) => {
        const labels: { [key: string]: string } = {
            'sell': 'For Sale',
            'rent': 'For Rent',
            'investment': 'Investment',
            'share': 'Shared Ownership'
        };
        return labels[type] || type;
    };

    const formatPropertyDescription = (description: string) => {
        return description.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const formatCapitalize = (text: string) => {
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
        return new Date(dateString).toLocaleDateString('en-US', {
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
            <Head title={`${property.title}`} />

            {/* Hero */}
            <section id="hero" className="flex flex-col gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24 w-full max-w-6xl">
                {/* Go Back */}
                <div className="flex justify-between items-center">
                    <div>
                        <NavLink href="/properties" className="text-text-primary" arrow={true}>Go Back</NavLink>
                    </div>
                    
                </div>
                <Text variant="heading2" className="text-text-primary max-w-6xl" as="h1">
                    {property.title}
                </Text>
                <img 
                    src={property.images[0] || 'https://via.placeholder.com/1200x500.png?text=No+Image'} 
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
                                <Text variant="bodyLarge" className="text-text-primary">Location</Text>
                                <a 
                                    href={property.property_location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    View on Google Maps
                                </a>
                            </div>
                        </div>
                        
                        {/* Property Description */}
                        {property.description && (
                            <div className="flex flex-col gap-4">
                                <Text variant="bodyLarge" className="text-text-primary">Description</Text>
                                <div 
                                    className="text-text-secondary prose prose-sm max-w-none [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-text-primary [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-text-primary [&>h3]:mt-3 [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:mb-3 [&>ol]:mb-3 [&>li]:mb-1 [&>blockquote]:border-l-4 [&>blockquote]:border-ui-3 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-text-secondary"
                                    dangerouslySetInnerHTML={{ __html: property.description }}
                                />
                            </div>
                        )}
                        
                        
                        {/* Pricing */}
                        <div className="flex gap-2.5 items-end">
                            <Text variant="heading3" className="text-text-primary">
                                {Math.round(property.price).toLocaleString('en-US')}
                            </Text>
                            <Text variant="bodyMedium" className="text-text-secondary">SAR</Text>
                        </div>
                        
                        {/* CTA */}
                        <Button text="Request a quote" variant='secondary' href="/contact" />
                    </div>

                    {/* Details */}
                    <div className="w-full h-fit gap-6 flex flex-col p-4 sm:p-6 overflow-hidden bg-ui-2 border border-ui-3 rounded-2xl">
                        <Text variant="heading3" className="text-text-primary w-full">Details</Text>
                        <div className="flex flex-col gap-4">
                            <DetailRow 
                                label="Area" 
                                value={`${property.property_area} m²`} 
                            />
                            <DetailRow 
                                label="Type" 
                                value={formatPropertyDescription(property.property_description)} 
                            />
                            <DetailRow 
                                label="Category" 
                                value={formatCapitalize(property.property_category)} 
                            />
                            <DetailRow 
                                label="License" 
                                value={property.advertising_license_number} 
                            />
                            {property.pdf && (
                                <DetailRow 
                                    label="Documents" 
                                    value="View PDF"
                                    isLink={true}
                                    href={`/storage/${property.pdf}`}
                                />
                            )}
                            <DetailRow 
                                label="Listed Date" 
                                value={formatDate(property.created_at)}
                                isLast={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                {property.images.length > 1 && (
                    <div className="flex flex-col w-full gap-6 max-w-6xl">
                        <Text variant="heading3" className="text-text-primary">Gallery</Text>
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

                {/* Location Map */}
                <div className="flex flex-col w-full gap-6 max-w-6xl">
                    <Text variant="heading3" className="text-text-primary">Location</Text>
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
            </section>
        </AppLayout>
    );
}