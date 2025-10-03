<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Author Information')
                    ->description('Manage the author\'s basic information and role.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter author name'),
                                Select::make('role')
                                    ->required()
                                    ->options([
                                        'Writer' => 'Writer',
                                        'Editor' => 'Editor',
                                        'Blogger' => 'Blogger',
                                        'Journalist' => 'Journalist',
                                        'Content Creator' => 'Content Creator',
                                        'Technical Writer' => 'Technical Writer',
                                    ])
                                    ->searchable()
                                    ->placeholder('Select author role'),
                            ]),
                        FileUpload::make('image')
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '1:1',
                                '4:3',
                            ])
                            ->directory('authors')
                            ->disk('public')
                            ->visibility('public')
                            ->columnSpanFull()
                            ->helperText('Upload a profile picture for the author (recommended: 400x400px)'),
                        Textarea::make('about')
                            ->rows(4)
                            ->maxLength(1000)
                            ->columnSpanFull()
                            ->placeholder('Write a brief bio about the author...'),
                    ]),
            ]);
    }
}
