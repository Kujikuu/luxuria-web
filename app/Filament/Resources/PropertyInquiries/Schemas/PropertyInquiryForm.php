<?php

namespace App\Filament\Resources\PropertyInquiries\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PropertyInquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
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
                    ->collapsible(),
            ]);
    }
}
