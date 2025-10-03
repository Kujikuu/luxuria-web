<?php

namespace App\Filament\Resources\PropertyInquiries;

use App\Filament\Resources\PropertyInquiries\Pages\CreatePropertyInquiry;
use App\Filament\Resources\PropertyInquiries\Pages\ListPropertyInquiries;
use App\Filament\Resources\PropertyInquiries\Schemas\PropertyInquiryForm;
use App\Filament\Resources\PropertyInquiries\Tables\PropertyInquiriesTable;
use App\Models\PropertyInquiry;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PropertyInquiryResource extends Resource
{
    protected static ?string $model = PropertyInquiry::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static string|UnitEnum|null $navigationGroup = 'Real Estate';

    protected static ?int $navigationSort = 3;

    protected static ?string $modelLabel = 'Property Inquiry';

    protected static ?string $pluralModelLabel = 'Property Inquiries';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PropertyInquiryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PropertyInquiriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPropertyInquiries::route('/'),
            'create' => CreatePropertyInquiry::route('/create'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
