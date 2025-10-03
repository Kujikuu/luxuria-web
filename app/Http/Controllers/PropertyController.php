<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $propertyType = $request->get('property_type');
        $propertyCategory = $request->get('property_category');
        $propertyDescription = $request->get('property_description');

        $properties = Property::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('property_location', 'like', "%{$search}%");
                });
            })
            ->when($propertyType, function ($query, $type) {
                $query->where('property_type', $type);
            })
            ->when($propertyCategory, function ($query, $category) {
                $query->where('property_category', $category);
            })
            ->when($propertyDescription, function ($query, $description) {
                $query->where('property_description', $description);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(6)
            ->withQueryString();

        // Format image URLs for frontend access
        $properties->getCollection()->transform(function ($property) {
            if ($property->images) {
                $property->images = array_map(function ($image) {
                    return '/storage/'.$image;
                }, $property->images);
            }

            return $property;
        });

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => [
                'search' => $search,
                'property_type' => $propertyType,
                'property_category' => $propertyCategory,
                'property_description' => $propertyDescription,
            ],
            'propertyTypes' => Property::PROPERTY_TYPES,
            'propertyCategories' => Property::PROPERTY_CATEGORIES,
            'propertyDescriptions' => Property::PROPERTY_DESCRIPTIONS,
        ]);
    }

    public function show(Request $request, string $param1, ?string $param2 = null)
    {
        // Handle both localized and non-localized routes
        // For non-localized routes: /properties/{slug} - param1 is slug, param2 is null
        // For localized routes: /{locale}/properties/{slug} - param1 is locale, param2 is slug

        if ($param2 === null) {
            // Non-localized route: param1 is the slug
            $slug = $param1;
        } else {
            // Localized route: param1 is locale, param2 is the slug
            $slug = $param2;
        }

        $property = Property::where('slug', $slug)->firstOrFail();

        // Format image URLs for frontend access
        if ($property->images) {
            $property->images = array_map(function ($image) {
                return '/storage/'.$image;
            }, $property->images);
        }

        return Inertia::render('Properties/Show', [
            'property' => $property,
        ]);
    }

    public static function getFeaturedProperties()
    {
        // Get featured properties, fallback to latest 6 if no featured properties exist
        $featuredProperties = Property::where('featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get();

        if ($featuredProperties->count() === 0) {
            $featuredProperties = Property::orderBy('created_at', 'desc')
                ->limit(6)
                ->get();
        }

        // Format image URLs for frontend access
        $featuredProperties->transform(function ($property) {
            if ($property->images) {
                $property->images = array_map(function ($image) {
                    return '/storage/'.$image;
                }, $property->images);
            }

            return $property;
        });

        return $featuredProperties;
    }
}
