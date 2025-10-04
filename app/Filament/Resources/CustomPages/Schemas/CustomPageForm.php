<?php

namespace App\Filament\Resources\CustomPages\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;

class CustomPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Page Settings')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255)
                                    ->helperText('URL-friendly identifier for the page'),
                                
                                Select::make('sort_order')
                                    ->options([
                                        0 => '0 (First)',
                                        1 => '1',
                                        2 => '2',
                                        3 => '3',
                                        4 => '4',
                                        5 => '5',
                                    ])
                                    ->default(0),
                            ]),
                        
                        Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ]),

                Section::make('Content')
                    ->schema([
                        Tabs::make('Languages')
                            ->tabs([
                                Tabs\Tab::make('English')
                                    ->schema([
                                        TextInput::make('title.en')
                                            ->label('Title')
                                            ->required()
                                            ->maxLength(255),
                                        
                                        TextInput::make('subtitle.en')
                                            ->label('Subtitle')
                                            ->maxLength(255),
                                        
                                        RichEditor::make('content.en')
                                            ->label('Content')
                                            ->required()
                                            ->columnSpanFull(),
                                    ]),
                                
                                Tabs\Tab::make('Arabic')
                                    ->schema([
                                        TextInput::make('title.ar')
                                            ->label('Title (Arabic)')
                                            ->maxLength(255),
                                        
                                        TextInput::make('subtitle.ar')
                                            ->label('Subtitle (Arabic)')
                                            ->maxLength(255),
                                        
                                        RichEditor::make('content.ar')
                                            ->label('Content (Arabic)')
                                            ->columnSpanFull(),
                                    ]),
                            ])
                    ]),
            ]);
    }
}
