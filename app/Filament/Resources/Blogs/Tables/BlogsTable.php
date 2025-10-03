<?php

namespace App\Filament\Resources\Blogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class BlogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('featured_image')
                    ->disk('public')
                    ->size(60)
                    ->square()
                    ->defaultImageUrl('https://placehold.co/300x300.png?text=No+Image'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->title)
                    ->description(fn ($record) => $record->about ? Str::limit($record->about, 60) : null),
                TextColumn::make('author.name')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('success')
                    ->description(fn ($record) => $record->author->role ?? null),
                TextColumn::make('publish_date')
                    ->dateTime('M d, Y')
                    ->sortable()
                    ->badge()
                    ->color(fn ($record) => $record->publish_date > now() ? 'warning' : 'success')
                    ->description(fn ($record) => $record->publish_date > now() ? 'Scheduled' : 'Published'),
                TextColumn::make('read_time')
                    ->suffix(' min')
                    ->alignCenter()
                    ->sortable(),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->copyable()
                    ->copyMessage('Slug copied')
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
                SelectFilter::make('author')
                    ->relationship('author', 'name')
                    ->searchable()
                    ->preload(),
                Filter::make('published')
                    ->query(fn (Builder $query): Builder => $query->where('publish_date', '<=', now()))
                    ->label('Published Posts'),
                Filter::make('scheduled')
                    ->query(fn (Builder $query): Builder => $query->where('publish_date', '>', now()))
                    ->label('Scheduled Posts'),
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
            ->defaultSort('publish_date', 'desc');
    }
}
