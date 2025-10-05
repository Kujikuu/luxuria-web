<?php

namespace App\Filament\Widgets;

use App\Models\PropertyInquiry;
use Filament\Actions;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentInquiriesWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                PropertyInquiry::with('property')
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Email copied')
                    ->copyMessageDuration(1500),

                Tables\Columns\TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Phone copied')
                    ->copyMessageDuration(1500),

                Tables\Columns\TextColumn::make('property.title')
                    ->label('Property')
                    ->searchable()
                    ->sortable()
                    ->limit(30)
                    ->tooltip(fn ($record): string => $record->property?->title ?? 'N/A')
                    ->placeholder('N/A'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('M j, Y g:i A')
                    ->sortable()
                    ->description(fn ($record): string => $record->created_at->diffForHumans()),

                Tables\Columns\IconColumn::make('contacted')
                    ->label('Contacted')
                    ->boolean()
                    ->trueIcon('heroicon-m-check-circle')
                    ->falseIcon('heroicon-m-clock')
                    ->trueColor('success')
                    ->falseColor('warning')
                    ->sortable(),
            ])
            ->paginated([5, 10, 25])
            ->striped()
            ->heading('Recent Property Inquiries')
            ->description('Latest inquiries from interested buyers/renters')
            ->emptyStateHeading('No inquiries yet')
            ->emptyStateDescription('No property inquiries have been received yet.')
            ->emptyStateActions([
                Actions\Action::make('create')
                    ->label('Create Inquiry')
                    ->url(route('filament.admin.resources.property-inquiries.create'))
                    ->icon('heroicon-m-plus'),
            ]);
    }
}
