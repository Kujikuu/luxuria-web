<?php

namespace App\Filament\Resources\Features\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class FeaturesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->size(50)
                    ->square()
                    ->defaultImageUrl('https://placehold.co/200x200.png?text=Feature'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title)
                    ->description(fn ($record) => $record->description ? Str::limit($record->description, 60) : null),
                TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable()
                    ->alignCenter()
                    ->badge()
                    ->color('gray'),
                IconColumn::make('is_active')
                    ->boolean()
                    ->sortable()
                    ->alignCenter()
                    ->label('Active'),
                TextColumn::make('title_ar')
                    ->label('Arabic Title')
                    ->searchable()
                    ->limit(30)
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->tooltip(fn ($record) => $record->title_ar),
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
                Filter::make('active')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true))
                    ->label('Active Features'),
                Filter::make('inactive')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', false))
                    ->label('Inactive Features'),
                Filter::make('with_image')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('image'))
                    ->label('With Image'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order');
    }
}
