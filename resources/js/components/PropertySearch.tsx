import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/useLocalization';
import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface PropertySearchProps {
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

export default function PropertySearch({ filters, propertyTypes, propertyCategories, propertyDescriptions }: PropertySearchProps) {
    const { t, isRtl } = useTranslations('components');
    const [search, setSearch] = useState(filters.search || '');
    const [propertyType, setPropertyType] = useState(filters.property_type || '');
    const [propertyCategory, setPropertyCategory] = useState(filters.property_category || '');
    const [propertyDescription, setPropertyDescription] = useState(filters.property_description || '');

    const normalizeSelectValue = (value: string) => (value === 'all' ? '' : value);
    const displaySelectValue = (value: string) => value || 'all';

    const handleSearch = () => {
        router.get(
            '/properties',
            {
                search: search || undefined,
                property_type: propertyType || undefined,
                property_category: propertyCategory || undefined,
                property_description: propertyDescription || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClear = () => {
        setSearch('');
        setPropertyType('');
        setPropertyCategory('');
        setPropertyDescription('');
        router.get(
            '/properties',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Handle Enter key press in search input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const formatPropertyTypeLabel = (type: string) => {
        const translatedType = t(`property_type_${type}`);
        if (translatedType && translatedType !== `property_type_${type}`) return translatedType;

        const labels: { [key: string]: string } = {
            sell: 'For Sale',
            rent: 'For Rent',
            investment: 'Investment',
            share: 'Shared Ownership',
        };
        return labels[type] || type;
    };

    const formatPropertyDescriptionLabel = (description: string) => {
        const translatedDescription = t(`property_description_${description}`);
        if (translatedDescription && translatedDescription !== `property_description_${description}`) return translatedDescription;

        return description
            .replace('_', ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formatCategoryLabel = (category: string) => {
        const translatedCategory = t(`property_category_${category}`);
        if (translatedCategory && translatedCategory !== `property_category_${category}`) return translatedCategory;

        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    return (
        <div className="w-full max-w-6xl rounded-2xl border border-ui-3 bg-ui-2 p-6">
            <div className="flex flex-col gap-4">
                {/* Search Input */}
                <div className="relative">
                    <MagnifyingGlassIcon
                        size={20}
                        className={`absolute top-1/2 -translate-y-1/2 transform text-text-secondary ${isRtl ? 'right-3' : 'left-3'}`}
                    />
                    <Input
                        type="text"
                        placeholder={t('search_placeholder') || 'Search properties by title, location...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className={isRtl ? 'pr-10 text-right' : 'pl-10 text-left'}
                        dir={isRtl ? 'rtl' : 'ltr'}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto lg:grid-cols-3">
                        {/* Property Type */}
                        <Select value={displaySelectValue(propertyType)} onValueChange={(value) => setPropertyType(normalizeSelectValue(value))}>
                            <SelectTrigger className="w-full min-w-0 bg-ui-1 lg:min-w-48" dir={isRtl ? 'rtl' : 'ltr'}>
                                <SelectValue placeholder={t('property_type') || 'Property Type'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('property_type') || 'Property Type'}</SelectItem>
                                {propertyTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {formatPropertyTypeLabel(type)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Property Category */}
                        <Select
                            value={displaySelectValue(propertyCategory)}
                            onValueChange={(value) => setPropertyCategory(normalizeSelectValue(value))}
                        >
                            <SelectTrigger className="w-full min-w-0 bg-ui-1 lg:min-w-48" dir={isRtl ? 'rtl' : 'ltr'}>
                                <SelectValue placeholder={t('category') || 'Category'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('category') || 'Category'}</SelectItem>
                                {propertyCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {formatCategoryLabel(category)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Property Description */}
                        <Select
                            value={displaySelectValue(propertyDescription)}
                            onValueChange={(value) => setPropertyDescription(normalizeSelectValue(value))}
                        >
                            <SelectTrigger className="w-full min-w-0 bg-ui-1 lg:min-w-56" dir={isRtl ? 'rtl' : 'ltr'}>
                                <SelectValue placeholder={t('property_description') || 'Property Description'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('property_description') || 'Property Description'}</SelectItem>
                                {propertyDescriptions.map((description) => (
                                    <SelectItem key={description} value={description}>
                                        {formatPropertyDescriptionLabel(description)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button onClick={handleSearch} className="flex-1 md:flex-initial">
                            {t('search_properties') || 'Search Properties'}
                        </Button>
                        <Button variant="outline" onClick={handleClear} className="flex-1 md:flex-initial">
                            {t('clear_filters') || 'Clear Filters'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
