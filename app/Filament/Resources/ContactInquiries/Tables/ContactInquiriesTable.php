<?php

namespace App\Filament\Resources\ContactInquiries\Tables;

use App\Filament\Resources\ContactInquiries\PromoteLeadAction;
use App\Models\ContactInquiry;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\Colors\Color;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ContactInquiriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('first_name')->label('Name')->searchable(['first_name', 'last_name'])->sortable()
                    ->formatStateUsing(fn (ContactInquiry $record): string => trim($record->first_name.' '.$record->last_name)),
                TextColumn::make('email')->label('Email')->searchable()->copyable(),
                TextColumn::make('phone')->label('Phone')->searchable()->copyable(),
                TextColumn::make('request_type')->label('Lead Type')->badge()
                    ->formatStateUsing(fn (ContactInquiry $record): string => $record->typeLabel('en')),
                TextColumn::make('promotion_status')->label('Hub Status')->badge()
                    ->state(fn (ContactInquiry $record): string => $record->promotionStatus())
                    ->color(fn (ContactInquiry $record): string => $record->hub_uid !== null ? 'success' : 'gray')
                    ->description(fn (ContactInquiry $record): ?string => $record->request_type === 'other' ? 'Awaiting Hub destination' : null),
                TextColumn::make('hub_uid')->label('Hub Reference')->placeholder('Not promoted')->copyable()->toggleable(),
                IconColumn::make('is_read')->label('Read')->boolean()
                    ->trueIcon('heroicon-o-eye')->falseIcon('heroicon-o-eye-slash')
                    ->trueColor(Color::Green)->falseColor(Color::Gray),
                TextColumn::make('created_at')->label('Received')->dateTime()->sortable()->since(),
            ])
            ->filters([
                SelectFilter::make('request_type')->label('Lead Type')->options([
                    ...ContactInquiry::leadTypes('en'),
                    'buy' => 'Buy Property (legacy)',
                    'sell' => 'Sell Property (legacy)',
                    'rent' => 'Consulting (legacy)',
                ]),
                TernaryFilter::make('promoted')->label('Hub Transfer')->attribute('hub_uid')->nullable()
                    ->trueLabel('Promoted')->falseLabel('Not promoted')->placeholder('All'),
                TernaryFilter::make('is_read')->label('Read Status')->trueLabel('Read')->falseLabel('Unread')->placeholder('All'),
            ])
            ->recordActions([
                ViewAction::make()->mutateRecordDataUsing(function (array $data): array {
                    $inquiry = ContactInquiry::query()->find($data['id']);
                    if ($inquiry && ! $inquiry->is_read) {
                        $inquiry->markAsRead();
                    }

                    return $data;
                }),
                EditAction::make()->label('Review'),
                PromoteLeadAction::make(),
            ])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])])
            ->defaultSort('created_at', 'desc')->striped();
    }
}
