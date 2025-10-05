<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use App\Models\PropertyInquiry;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PropertyStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalProperties = Property::count();
        $featuredProperties = Property::where('featured', true)->count();
        $totalInquiries = PropertyInquiry::count();
        $avgPrice = Property::avg('price');

        return [
            Stat::make('Total Properties', $totalProperties)
                ->description('All listed properties')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->chart([7, 12, 10, 14, 15, 18, $totalProperties])
                ->color('primary'),

            Stat::make('Featured Properties', $featuredProperties)
                ->description($totalProperties > 0 ? round(($featuredProperties / $totalProperties) * 100, 1).'% of total' : '0% of total')
                ->descriptionIcon('heroicon-m-star')
                ->color('warning'),

            Stat::make('Total Inquiries', $totalInquiries)
                ->description('All property inquiries')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('info'),

            Stat::make('Average Price', 'SAR '.number_format($avgPrice, 0))
                ->description('Property average')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success'),
        ];
    }

    protected function getColumns(): int
    {
        return 4;
    }
}
