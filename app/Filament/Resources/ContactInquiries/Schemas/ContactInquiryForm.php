<?php

namespace App\Filament\Resources\ContactInquiries\Schemas;

use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ContactInquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->label('First Name')
                    ->required()
                    ->disabled(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->disabled(),
                TextInput::make('phone')
                    ->label('Phone')
                    ->required()
                    ->disabled(),
                Select::make('request_type')
                    ->label('Request Type')
                    ->options([
                        'buy' => 'Buy Property',
                        'sell' => 'Sell Property',
                        'rent' => 'Consulting',
                    ])
                    ->required()
                    ->disabled(),
                Textarea::make('message')
                    ->label('Message')
                    ->required()
                    ->disabled()
                    ->rows(4),
                Checkbox::make('is_read')
                    ->label('Mark as Read'),
            ]);
    }
}
