<?php

namespace App\Filament\Resources\Features\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class FeatureForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Feature Content')
                    ->tabs([
                        Tabs\Tab::make('English')
                            ->schema([
                                Section::make('Feature Information (English)')
                                    ->description('Manage the feature details in English.')
                                    ->schema([
                                        TextInput::make('title')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpanFull()
                                            ->placeholder('Enter the feature title'),
                                        Textarea::make('description')
                                            ->required()
                                            ->rows(4)
                                            ->columnSpanFull()
                                            ->placeholder('Write a description of the feature...'),
                                    ]),
                            ]),
                        Tabs\Tab::make('العربية')
                            ->schema([
                                Section::make('معلومات الميزة (عربي)')
                                    ->description('إدارة تفاصيل الميزة باللغة العربية.')
                                    ->schema([
                                        TextInput::make('title_ar')
                                            ->maxLength(255)
                                            ->columnSpanFull()
                                            ->placeholder('أدخل عنوان الميزة')
                                            ->label('العنوان')
                                            ->helperText('عنوان الميزة باللغة العربية'),
                                        Textarea::make('description_ar')
                                            ->rows(4)
                                            ->columnSpanFull()
                                            ->placeholder('اكتب وصف الميزة...')
                                            ->label('الوصف')
                                            ->helperText('وصف الميزة باللغة العربية'),
                                    ]),
                            ]),
                    ]),
                Section::make('Visual Elements')
                    ->description('Add images for the feature.')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '1:1',
                                '16:9',
                                '4:3',
                            ])
                            ->directory('feature-images')
                            ->disk('public')
                            ->visibility('public')
                            ->columnSpanFull()
                            ->helperText('Upload a feature image (optional)'),
                    ])
                    ->collapsible(),
                Section::make('Display Settings')
                    ->description('Control how the feature appears on the website.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0)
                                    ->placeholder('0')
                                    ->helperText('Lower numbers appear first'),
                                Toggle::make('is_active')
                                    ->default(true)
                                    ->helperText('Control whether this feature is visible on the website'),
                            ]),
                    ])
                    ->collapsible(),
            ]);
    }
}
