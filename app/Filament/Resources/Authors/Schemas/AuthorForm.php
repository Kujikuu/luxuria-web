<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Author Content')
                    ->tabs([
                        Tabs\Tab::make('English')
                            ->schema([
                                Section::make('Author Information (English)')
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
                                        Textarea::make('about')
                                            ->rows(4)
                                            ->maxLength(1000)
                                            ->columnSpanFull()
                                            ->placeholder('Write a brief bio about the author...'),
                                    ]),
                            ]),
                        Tabs\Tab::make('العربية')
                            ->schema([
                                Section::make('معلومات الكاتب (عربي)')
                                    ->description('إدارة المعلومات الأساسية والدور للكاتب.')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('name_ar')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('أدخل اسم الكاتب')
                                                    ->label('الاسم')
                                                    ->helperText('اسم الكاتب باللغة العربية'),
                                                TextInput::make('role_ar')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->placeholder('كاتب، محرر، صحفي، منشئ محتوى')
                                                    ->label('الدور')
                                                    ->helperText('دور الكاتب أو منصبه باللغة العربية'),
                                            ]),
                                        Textarea::make('about_ar')
                                            ->rows(4)
                                            ->maxLength(1000)
                                            ->columnSpanFull()
                                            ->placeholder('اكتب سيرة مختصرة عن الكاتب...')
                                            ->label('نبذة')
                                            ->helperText('نبذة مختصرة عن الكاتب باللغة العربية'),
                                    ]),
                            ]),
                    ]),
                Section::make('Profile Image')
                    ->description('Upload a profile picture for the author.')
                    ->schema([
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
                    ])
                    ->collapsible(),
            ]);
    }
}
