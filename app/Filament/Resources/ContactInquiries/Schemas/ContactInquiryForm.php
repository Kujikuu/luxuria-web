<?php

namespace App\Filament\Resources\ContactInquiries\Schemas;

use App\Models\ContactInquiry;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ContactInquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('first_name')->label('First Name')->disabled(),
            TextInput::make('last_name')->label('Last Name')->disabled(),
            TextInput::make('email')->label('Email')->disabled(),
            TextInput::make('phone')->label('Phone')->disabled(),
            Select::make('request_type')->label('Lead Type')->options([
                ...ContactInquiry::leadTypes('en'),
                'buy' => 'Buy Property (legacy)',
                'sell' => 'Sell Property (legacy)',
                'rent' => 'Consulting (legacy)',
            ])->disabled(),
            Textarea::make('message')->label('Message')->rows(4)->disabled(),
            TextInput::make('locale')->label('Submission Language')->disabled(),
            TextInput::make('consented_at')->label('Sharing Consent Recorded At')->disabled(),
            TextInput::make('promotion_status')->label('Hub Status')
                ->formatStateUsing(fn (?ContactInquiry $record): string => $record?->promotionStatus() ?? 'Pending approval')->disabled(),
            TextInput::make('hub_uid')->label('Sniper Hub Reference')->disabled(),
            TextInput::make('hub_target')->label('Hub Destination')->disabled(),
            TextInput::make('promoted_at')->label('Promoted At')->disabled(),
            TextInput::make('promoted_by_name')->label('Approved By')
                ->formatStateUsing(fn (?ContactInquiry $record): string => $record?->promoter?->name ?? '—')->disabled(),
            Checkbox::make('is_read')->label('Mark as Read'),
        ]);
    }
}
