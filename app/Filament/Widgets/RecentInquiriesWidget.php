<?php

namespace App\Filament\Widgets;

use App\Models\PropertyInquiry;
use Filament\Actions;
use Filament\Actions\ViewAction;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;

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
                    ->tooltip(fn($record): string => $record->property?->title ?? 'N/A')
                    ->placeholder('N/A'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('M j, Y g:i A')
                    ->sortable()
                    ->description(fn($record): string => $record->created_at->diffForHumans()),

                Tables\Columns\IconColumn::make('contacted')
                    ->label('Contacted')
                    ->boolean()
                    ->trueIcon('heroicon-m-check-circle')
                    ->falseIcon('heroicon-m-clock')
                    ->trueColor('success')
                    ->falseColor('warning')
                    ->sortable(),
            ])
            ->actions([
                ViewAction::make()
                    ->schema([
                        Section::make('Inquiry Information')
                            ->description('Client inquiry details and contact information.')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('Client name'),
                                        TextInput::make('phone')
                                            ->required()
                                            ->maxLength(20)
                                            ->placeholder('+966 50 123 4567'),
                                    ]),
                                TextInput::make('email')
                                    ->email()
                                    ->maxLength(255)
                                    ->placeholder('client@example.com')
                                    ->columnSpanFull(),
                                Select::make('property_id')
                                    ->relationship('property', 'title')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->columnSpanFull()
                                    ->placeholder('Select property'),
                            ]),
                        Section::make('System Information')
                            ->description('System-generated tracking information.')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('ip_address')
                                            ->label('IP Address')
                                            ->placeholder('192.168.1.1')
                                            ->disabled(),
                                        DateTimePicker::make('viewed_at')
                                            ->required()
                                            ->default(now())
                                            ->native(false),
                                    ]),
                                Textarea::make('user_agent')
                                    ->label('User Agent')
                                    ->rows(3)
                                    ->disabled()
                                    ->columnSpanFull(),
                            ])
                            ->collapsible()
                    ])
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
