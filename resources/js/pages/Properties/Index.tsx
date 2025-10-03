import PropertyCard from "@/components/Cards/PropertyCard";
import PropertyPagination from "@/components/PropertyPagination";
import PropertySearch from "@/components/PropertySearch";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

interface Property {
    id: number;
    title: string;
    slug: string;
    property_type: string;
    property_category: string;
    property_description: string;
    property_area: number;
    property_location: string;
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

export default function PropertiesPage({ 
    properties, 
    filters, 
    propertyTypes, 
    propertyCategories, 
    propertyDescriptions 
}: PropertiesPageProps) {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="Listings" />

            {/* Hero */}
            <div className="flex flex-col items-center justify-center gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10 pb-24">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <Text variant="heading2" className="w-full text-text-primary">
                        Discover homes tailored to your unique way of living
                    </Text>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            Step into a curated portfolio of breathtaking residences.
                        </Text>
                    </div>
                </div>

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
                            Found {properties.total} properties
                            {filters.search && ` for "${filters.search}"`}
                        </Text>
                    </div>
                )}

                {/* Properties Grid */}
                <div className="w-full max-w-6xl">
                    {properties.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative w-full">
                            {properties.data.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    href={`/properties/${property.slug}`}
                                    img={property.images[0] || 'https://placehold.co/400x300.png?text=No+Image'}
                                    name={property.title}
                                    price={property.price}
                                    area={property.property_area}
                                    propertyType={property.property_type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Text variant="heading4" className="text-text-primary mb-4">
                                No properties found
                            </Text>
                            <Text variant="bodyLarge" className="text-text-secondary text-center">
                                {filters.search || filters.property_type || filters.property_category || filters.property_description
                                    ? "Try adjusting your search criteria or filters"
                                    : "No properties are available at the moment"
                                }
                            </Text>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {properties.data.length > 0 && (
                    <PropertyPagination pagination={properties} />
                )}
            </div>
        </AppLayout>
    );
}