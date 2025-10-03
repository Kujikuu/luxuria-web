import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyPagination from '@/components/PropertyPagination';
import PropertySearch from '@/components/PropertySearch';
import { Text } from '@/components/Typography';
import { useTranslations } from '@/hooks/useLocalization';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    data: Property[];
}

interface PropertiesPageProps {
    properties: PaginationData;
    filters: {
        search?: string;
        property_type?: string;
        property_category?: string;
        property_description?: string;
    };
    propertyTypes: string[];
    propertyCategories: string[];
    propertyDescriptions: string[];
}

export default function PropertiesPage({ properties, filters, propertyTypes, propertyCategories, propertyDescriptions }: PropertiesPageProps) {
    const { t } = useTranslations('pages');
    return (
        <AppLayout color="white" section="hero">
            <Head title={t('properties_title')} />

            {/* Hero */}
            <div className="-mt-20 flex w-full flex-col items-center justify-center gap-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 md:px-10 md:pt-52">
                {/* Header */}
                <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
                    <Text variant="heading2" className="w-full text-text-primary">
                        {t('discover_homes')}
                    </Text>
                    <div className="flex w-full max-w-96 items-start gap-6 lg:items-end lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('curated_portfolio')}
                        </Text>
                    </div>
                </div>

                {/* Premium Status Banner
                <div className="w-full max-w-6xl">
                    <UnlockStatusBanner />
                </div> */}

                {/* Search and Filters */}
                <PropertySearch
                    filters={filters}
                    propertyTypes={propertyTypes}
                    propertyCategories={propertyCategories}
                    propertyDescriptions={propertyDescriptions}
                />

                {/* Results Count */}
                {properties.data.length > 0 && (
                    <div className="w-full max-w-6xl">
                        <Text variant="bodyMedium" className="text-text-secondary">
                            {t('found_properties', { count: properties.total }) || `Found ${properties.total} properties`}
                            {filters.search && ` ${t('for')} "${filters.search}"`}
                        </Text>
                    </div>
                )}

                {/* Properties Grid */}
                <div className="w-full max-w-6xl">
                    {properties.data.length > 0 ? (
                        <div className="relative grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {properties.data.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    href={`/properties/${property.slug}`}
                                    img={property.images[0] || 'https://placehold.co/400x300.png?text=No+Image'}
                                    name={property.title}
                                    name_ar={property.title_ar}
                                    price={property.price}
                                    area={property.property_area}
                                    propertyType={property.property_type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Text variant="heading4" className="mb-4 text-text-primary">
                                {t('no_properties_found')}
                            </Text>
                            <Text variant="bodyLarge" className="text-center text-text-secondary">
                                {filters.search || filters.property_type || filters.property_category || filters.property_description
                                    ? t('try_adjusting_filters') || 'Try adjusting your search criteria or filters'
                                    : t('no_properties_available') || 'No properties are available at the moment'}
                            </Text>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {properties.data.length > 0 && <PropertyPagination pagination={properties} />}
            </div>
        </AppLayout>
    );
}
