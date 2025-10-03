import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

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

export default function PropertySearch({ 
    filters, 
    propertyTypes, 
    propertyCategories, 
    propertyDescriptions 
}: PropertySearchProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [propertyType, setPropertyType] = useState(filters.property_type || '');
    const [propertyCategory, setPropertyCategory] = useState(filters.property_category || '');
    const [propertyDescription, setPropertyDescription] = useState(filters.property_description || '');

    const handleSearch = () => {
        router.get('/properties', {
            search: search || undefined,
            property_type: propertyType || undefined,
            property_category: propertyCategory || undefined,
            property_description: propertyDescription || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClear = () => {
        setSearch('');
        setPropertyType('');
        setPropertyCategory('');
        setPropertyDescription('');
        router.get('/properties', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handle Enter key press in search input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const formatPropertyTypeLabel = (type: string) => {
        const labels: { [key: string]: string } = {
            'sell': 'For Sale',
            'rent': 'For Rent',
            'investment': 'Investment',
            'share': 'Shared Ownership'
        };
        return labels[type] || type;
    };

    const formatPropertyDescriptionLabel = (description: string) => {
        return description.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="w-full max-w-6xl bg-ui-2 border border-ui-3 rounded-2xl p-6">
            <div className="flex flex-col gap-4">
                {/* Search Input */}
                <div className="relative">
                    <MagnifyingGlassIcon 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                    <Input
                        type="text"
                        placeholder="Search properties by title, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10"
                    />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Property Type */}
                    <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {propertyTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {formatPropertyTypeLabel(type)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Property Category */}
                    <Select value={propertyCategory} onValueChange={setPropertyCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {propertyCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Property Description */}
                    <Select value={propertyDescription} onValueChange={setPropertyDescription}>
                        <SelectTrigger>
                            <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
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
                    <Button 
                        onClick={handleSearch}
                        className="flex-1 md:flex-initial"
                    >
                        Search Properties
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={handleClear}
                        className="flex-1 md:flex-initial"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}