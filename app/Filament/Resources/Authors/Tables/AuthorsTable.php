<?php

namespace App\Filament\Resources\Authors\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->circular()
                    ->size(50)
                    ->defaultImageUrl(fn () => 'https://ui-avatars.com/api/?name='.urlencode('Author').'&color=7F9CF5&background=EBF4FF'),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('medium')
                    ->description(fn ($record) => $record->role),
                TextColumn::make('role')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Writer' => 'success',
                        'Editor' => 'warning',
                        'Blogger' => 'info',
                        'Journalist' => 'primary',
                        'Content Creator' => 'gray',
                        'Technical Writer' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('blogs_count')
                    ->counts('blogs')
                    ->label('Blog Posts')
                    ->sortable()
                    ->alignCenter(),
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
                SelectFilter::make('role')
                    ->options([
                        'Writer' => 'Writer',
                        'Editor' => 'Editor',
                        'Blogger' => 'Blogger',
                        'Journalist' => 'Journalist',
                        'Content Creator' => 'Content Creator',
                        'Technical Writer' => 'Technical Writer',
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
