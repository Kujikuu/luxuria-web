<?php

namespace App\Filament\Resources\Translations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class TranslationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('group')
                    ->label('Group')
                    ->options([
                        'common' => 'Common',
                        'pages' => 'Pages',
                        'components' => 'Components',
                    ])
                    ->searchable()
                    ->required()
                    ->helperText('Select the translation group (common, pages, components)'),
                            
                Select::make('locale')
                    ->label('Language')
                    ->options([
                        'en' => 'English',
                        'ar' => 'Arabic',
                    ])
                    ->required()
                    ->helperText('Select the language for this translation'),
                    
                TextInput::make('key')
                    ->label('Translation Key')
                    ->required()
                    ->helperText('Enter the translation key (e.g., home, about, contact_us)')
                    ->columnSpanFull(),
                    
                Textarea::make('value')
                    ->label('Translation Value')
                    ->required()
                    ->rows(3)
                    ->helperText('Enter the translated text')
                    ->columnSpanFull(),
            ]);
    }
}
