import Button from "../Buttons/Button";
import PropertyCard from "../Cards/PropertyCard";
import Tag from "../Tag";
import { Text } from "../Typography";
import { useTranslations } from "@/hooks/useLocalization";

interface Property {
    id: number;
    title: string;
    title_ar?: string;
    slug: string;
    property_type: string;
    property_area: number;
    images: string[];
    price: number;
}

interface HomePropertiesProps {
    properties: Property[];
}

export default function HomeProperties({ properties }: HomePropertiesProps) {
    const { t } = useTranslations('components');
    
    return (
        <section id="nav" className="flex flex-col relative gap-6 sm:gap-8 md:gap-10 px-4 py-8 sm:px-6 sm:py-12 md:pt-36 md:px-10 md:pb-24 items-center w-full max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 w-full h-fit">
                <Text variant="heading2" className="text-text-primary w-full text-center sm:text-left">
                    {t('find_homes_header') || 'Find homes that perfectly match your lifestyle'}
                </Text>

                <div className="flex flex-col justify-start items-start xl:items-end w-full">
                    <Button text={t('view_all') || 'View all'} variant='secondary' href="/properties" />
                </div>
            </div>

            {/* Container */}
            <div className="w-full">
                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative w-full">
                        {properties.map((property) => (
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
                        <Text variant="heading4" className="text-text-primary mb-4">
                            {t('no_properties_available') || 'No properties available'}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary text-center">
                            {t('check_back_soon') || 'Check back soon for new property listings'}
                        </Text>
                    </div>
                )}
            </div>
        </section>
    );
}