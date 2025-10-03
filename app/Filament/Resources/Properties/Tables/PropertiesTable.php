<?php

namespace App\Filament\Resources\Properties\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Number;

class PropertiesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('images')
                    ->getStateUsing(fn ($record) => $record->images[0] ?? null)
                    ->disk('public')
                    ->size(60)
                    ->square()
                    ->defaultImageUrl('https://placehold.co/300x300.png?text=No+Image'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title)
                    ->weight('semibold'),
                TextColumn::make('property_type')
                    ->searchable()
                    ->sortable()
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
                TextColumn::make('property_category')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color(fn (string $state): string => $state === 'residential' ? 'primary' : 'secondary')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),
                TextColumn::make('property_description')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn (string $state): string => ucwords(str_replace('_', ' ', $state))),
                TextColumn::make('property_area')
                    ->sortable()
                    ->suffix(' m²')
                    ->alignEnd()
                    ->formatStateUsing(fn ($state) => Number::format($state, 2)),
                TextColumn::make('price')
                    ->money('SAR')
                    ->sortable()
                    ->alignEnd()
                    ->weight('semibold')
                    ->color('success'),
                IconColumn::make('pdf')
                    ->boolean()
                    ->label('Documents')
                    ->alignCenter()
                    ->trueIcon('heroicon-o-document-text')
                    ->falseIcon('heroicon-o-x-mark')
                    ->trueColor('success')
                    ->falseColor('gray'),
                TextColumn::make('advertising_license_number')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->copyable()
                    ->copyMessage('License number copied')
                    ->copyMessageDuration(1500),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('property_type')
                    ->options([
                        'sell' => 'For Sale',
                        'rent' => 'For Rent',
                        'investment' => 'Investment',
                        'share' => 'Shared Ownership',
                    ])
                    ->multiple(),
                SelectFilter::make('property_category')
                    ->options([
                        'residential' => 'Residential',
                        'commercial' => 'Commercial',
                    ])
                    ->multiple(),
                SelectFilter::make('property_description')
                    ->options([
                        'land' => 'Land',
                        'villa' => 'Villa',
                        'apartment' => 'Apartment',
                        'room' => 'Room',
                        'building' => 'Building',
                        'commercial_complex' => 'Commercial Complex',
                        'station' => 'Station',
                        'shop' => 'Shop',
                        'other' => 'Other',
                    ])
                    ->multiple(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
