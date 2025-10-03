<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('FAQ Content')
                    ->tabs([
                        Tabs\Tab::make('English')
                            ->schema([
                                Section::make('FAQ Information (English)')
                                    ->description('Manage the FAQ question and answer in English.')
                                    ->schema([
                                        TextInput::make('question')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpanFull()
                                            ->placeholder('Enter the FAQ question'),
                                        Textarea::make('answer')
                                            ->required()
                                            ->columnSpanFull()
                                            ->placeholder('Write the answer to the FAQ question...'),
                                    ]),
                            ]),
                        Tabs\Tab::make('العربية')
                            ->schema([
                                Section::make('معلومات الأسئلة الشائعة (عربي)')
                                    ->description('إدارة السؤال والجواب باللغة العربية.')
                                    ->schema([
                                        TextInput::make('question_ar')
                                            ->maxLength(255)
                                            ->columnSpanFull()
                                            ->placeholder('أدخل السؤال الشائع')
                                            ->label('السؤال')
                                            ->helperText('السؤال الشائع باللغة العربية'),
                                        Textarea::make('answer_ar')
                                            ->columnSpanFull()
                                            
                                            ->placeholder('اكتب إجابة السؤال الشائع...')
                                            ->label('الإجابة')
                                            ->helperText('إجابة السؤال الشائع باللغة العربية'),
                                    ]),
                            ]),
                    ]),
                Section::make('Display Settings')
                    ->description('Control how the FAQ appears on the website.')
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
                                    ->helperText('Control whether this FAQ is visible on the website'),
                            ]),
                    ])
                    ->collapsible(),
            ]);
    }
}
