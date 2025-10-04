<?php

namespace App\Filament\Resources\CustomPages;

use App\Filament\Resources\CustomPages\Pages\CreateCustomPage;
use App\Filament\Resources\CustomPages\Pages\EditCustomPage;
use App\Filament\Resources\CustomPages\Pages\ListCustomPages;
use App\Filament\Resources\CustomPages\Schemas\CustomPageForm;
use App\Filament\Resources\CustomPages\Tables\CustomPagesTable;
use App\Models\CustomPage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CustomPageResource extends Resource
{
    protected static ?string $model = CustomPage::class;

    protected static ?string $navigationLabel = 'Custom Pages';

    protected static ?string $modelLabel = 'Custom Page';

    protected static ?string $pluralModelLabel = 'Custom Pages';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocument;

    public static function form(Schema $schema): Schema
    {
        return CustomPageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CustomPagesTable::configure($table);
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
            'index' => ListCustomPages::route('/'),
            'create' => CreateCustomPage::route('/create'),
            'edit' => EditCustomPage::route('/{record}/edit'),
        ];
    }
}
