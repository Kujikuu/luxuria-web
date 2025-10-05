<?php

namespace App\Filament\Widgets;

use App\Models\Property;
use Filament\Widgets\ChartWidget;

class PropertiesByTypeChartWidget extends ChartWidget
{
    protected static ?int $sort = 3;

    protected ?string $heading = 'Properties by Type';

    protected int|string|array $columnSpan = 2;

    protected ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $data = Property::selectRaw('property_type, COUNT(*) as count')
            ->groupBy('property_type')
            ->orderBy('count', 'desc')
            ->get();

        $typeLabels = [
            'sell' => 'For Sale',
            'rent' => 'For Rent',
            'investment' => 'Investment',
            'share' => 'Shared Ownership',
        ];

        $labels = [];
        $values = [];

        foreach ($data as $item) {
            $labels[] = $typeLabels[$item->property_type] ?? ucfirst($item->property_type);
            $values[] = $item->count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Properties',
                    'data' => $values,
                    'backgroundColor' => [
                        '#013841',  // primary color
                        '#10b981',  // success
                        '#f59e0b',  // warning
                        '#6366f1',  // info
                    ],
                    'borderWidth' => 0,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                    'labels' => [
                        'padding' => 15,
                        'usePointStyle' => true,
                    ],
                ],
            ],
            'maintainAspectRatio' => false,
        ];
    }
}
