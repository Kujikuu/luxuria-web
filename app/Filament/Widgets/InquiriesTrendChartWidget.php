<?php

namespace App\Filament\Widgets;

use App\Models\PropertyInquiry;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class InquiriesTrendChartWidget extends ChartWidget
{
    protected static ?int $sort = 4;

    protected ?string $heading = 'Inquiries Trend (Last 7 Days)';

    protected int|string|array $columnSpan = 2;

    protected ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $inquiries = PropertyInquiry::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', Carbon::now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Fill missing dates with 0
        $dates = [];
        $counts = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('M j');
            $dates[] = $date;

            $count = $inquiries->firstWhere('date', Carbon::now()->subDays($i)->format('Y-m-d'));
            $counts[] = $count ? $count->count : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Inquiries',
                    'data' => $counts,
                    'fill' => true,
                    'backgroundColor' => 'rgba(1, 56, 65, 0.1)',
                    'borderColor' => '#013841',
                    'tension' => 0.4,
                    'pointBackgroundColor' => '#013841',
                    'pointBorderColor' => '#fff',
                    'pointHoverRadius' => 6,
                    'pointHoverBackgroundColor' => '#fff',
                    'pointHoverBorderColor' => '#013841',
                ],
            ],
            'labels' => $dates,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                    ],
                    'grid' => [
                        'display' => true,
                        'color' => 'rgba(0, 0, 0, 0.05)',
                    ],
                ],
                'x' => [
                    'grid' => [
                        'display' => false,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
            ],
            'interaction' => [
                'intersect' => false,
                'mode' => 'index',
            ],
        ];
    }
}
