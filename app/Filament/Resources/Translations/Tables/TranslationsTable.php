<?php

namespace App\Filament\Resources\Translations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TranslationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('group')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'common' => 'success',
                        'pages' => 'info',
                        'components' => 'warning',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
                    
                TextColumn::make('key')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),
                    
                TextColumn::make('locale')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'en' => 'primary',
                        'ar' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'en' => 'English',
                        'ar' => 'Arabic',
                        default => $state,
                    })
                    ->searchable()
                    ->sortable(),
                    
                TextColumn::make('value')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })
                    ->searchable(),
                    
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable()
                    ->since()
                    ->toggleable(),
            ])
            ->defaultSort('group')
            ->filters([
                SelectFilter::make('group')
                    ->options([
                        'common' => 'Common',
                        'pages' => 'Pages', 
                        'components' => 'Components',
                    ])
                    ->multiple(),
                    
                SelectFilter::make('locale')
                    ->options([
                        'en' => 'English',
                        'ar' => 'Arabic',
                    ])
                    ->multiple(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                CreateAction::make(),
            ])
            // ->toolbarActionsPosition('both')
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateActions([
                CreateAction::make(),
            ]);
    }
}
