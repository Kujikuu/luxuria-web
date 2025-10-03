<?php

namespace App\Filament\Resources\PropertyInquiries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class PropertyInquiriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('semibold'),
                TextColumn::make('phone')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Phone number copied')
                    ->copyMessageDuration(1500),
                TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Email copied')
                    ->copyMessageDuration(1500)
                    ->placeholder('No email provided'),
                TextColumn::make('property.title')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->property->title)
                    ->url(fn ($record) => "/properties/{$record->property->slug}", shouldOpenInNewTab: true),
                TextColumn::make('property.property_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'sell' => 'success',
                        'rent' => 'info',
                        'investment' => 'warning',
                        'share' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'sell' => 'For Sale',
                        'rent' => 'For Rent',
                        'investment' => 'Investment',
                        'share' => 'Shared',
                        default => $state,
                    }),
                TextColumn::make('property.price')
                    ->money('SAR')
                    ->sortable()
                    ->alignEnd(),
                TextColumn::make('ip_address')
                    ->label('IP Address')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('viewed_at')
                    ->dateTime()
                    ->sortable()
                    ->description(fn ($record) => $record->viewed_at->diffForHumans()),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('property')
                    ->relationship('property', 'title')
                    ->searchable()
                    ->preload(),
                Filter::make('has_email')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('email'))
                    ->label('Has Email'),
                Filter::make('recent')
                    ->query(fn (Builder $query): Builder => $query->where('viewed_at', '>=', now()->subDays(7)))
                    ->label('Last 7 Days'),
            ])
            ->recordActions([
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('viewed_at', 'desc');
    }
}
