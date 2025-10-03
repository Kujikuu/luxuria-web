<?php

namespace App\Filament\Resources\Properties\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PropertyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Tabs::make('Property Content')
                    ->tabs([
                        Tabs\Tab::make('English')
                            ->schema([
                                Section::make('Basic Information (English)')
                                    ->description('Enter the basic property details and identifiers.')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('title')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null)
                                                    ->placeholder('Enter property title'),
                                                TextInput::make('slug')
                                                    ->required()
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->placeholder('auto-generated-slug'),
                                            ]),
                                        TextInput::make('advertising_license_number')
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->placeholder('ADV-123456')
                                            ->helperText('Enter the official advertising license number'),
                                        Textarea::make('property_location')
                                            ->required()
                                            ->rows(2)
                                            ->placeholder('https://maps.google.com/?q=25.2048,55.2708')
                                            ->helperText('Enter Google Maps location link'),
                                        RichEditor::make('description')
                                            ->nullable()
                                            ->toolbarButtons([
                                                'attachFiles',
                                                'blockquote',
                                                'bold',
                                                'bulletList',
                                                'codeBlock',
                                                'h2',
                                                'h3',
                                                'italic',
                                                'link',
                                                'orderedList',
                                                'redo',
                                                'strike',
                                                'underline',
                                                'undo',
                                            ])
                                            ->placeholder('Enter detailed property description...')
                                            ->helperText('Add a detailed description with formatting (optional)'),
                                        Toggle::make('featured')
                                            ->label('Featured Property')
                                            ->helperText('Mark this property as featured to display on homepage')
                                            ->default(false),
                                    ]),
                            ]),
                        Tabs\Tab::make('العربية')
                            ->schema([
                                Section::make('المعلومات الأساسية (عربي)')
                                    ->description('أدخل تفاصيل العقار والمعرفات الأساسية.')
                                    ->schema([
                                        TextInput::make('title_ar')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('أدخل عنوان العقار')
                                            ->label('العنوان')
                                            ->helperText('العنوان باللغة العربية'),
                                        Textarea::make('property_location_ar')
                                            ->required()
                                            ->rows(2)
                                            ->placeholder('الرياض، حي النرجس، شارع الملك فهد')
                                            ->label('موقع العقار')
                                            ->helperText('وصف موقع العقار باللغة العربية'),
                                        RichEditor::make('description_ar')
                                            ->nullable()
                                            ->toolbarButtons([
                                                'attachFiles',
                                                'blockquote',
                                                'bold',
                                                'bulletList',
                                                'codeBlock',
                                                'h2',
                                                'h3',
                                                'italic',
                                                'link',
                                                'orderedList',
                                                'redo',
                                                'strike',
                                                'underline',
                                                'undo',
                                            ])
                                            ->placeholder('أدخل وصف مفصل للعقار...')
                                            ->label('الوصف')
                                            ->helperText('أضف وصفًا مفصلاً مع التنسيق (اختياري)'),
                                    ]),
                            ]),
                    ])
                    ->columnSpan(2),
                Section::make('Property Classification')
                    ->description('Classify the property type and category.')
                    ->schema([
                        Select::make('property_type')
                            ->required()
                            ->options([
                                'sell' => 'For Sale',
                                'rent' => 'For Rent',
                                'investment' => 'Investment',
                                'share' => 'Shared Ownership',
                            ])
                            ->native(false)
                            ->placeholder('Select property type'),
                        Select::make('property_category')
                            ->required()
                            ->options([
                                'residential' => 'Residential',
                                'commercial' => 'Commercial',
                            ])
                            ->native(false)
                            ->placeholder('Select property category'),
                        Select::make('property_description')
                            ->required()
                            ->options([
                                'land' => 'Land',
                                'villa' => 'Villa',
                                'apartment' => 'Apartment',
                                'room' => 'Room',
                                'building' => 'Building',
                                'commercial_complex' => 'Commercial Complex',
                                'station' => 'Station',
                                'shop' => 'Shop',
                                'other' => 'Other',
                            ])
                            ->native(false)
                            ->searchable()
                            ->placeholder('Select property description'),
                    ])
                    ->columnSpan(1),
                Section::make('Property Details')
                    ->description('Enter property specifications and pricing.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('property_area')
                                    ->required()
                                    ->numeric()
                                    ->suffix('m²')
                                    ->step(0.01)
                                    ->placeholder('500.50')
                                    ->helperText('Area in square meters'),
                                TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('SAR')
                                    ->step(0.01)
                                    ->placeholder('150000.00')
                                    ->helperText('Property price in SAR'),
                            ]),

                    ])
                    ->columnSpan(3),
                Section::make('Property Images')
                    ->description('Upload multiple images to showcase the property.')
                    ->schema([
                        FileUpload::make('images')
                            ->multiple()
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->disk('public')
                            ->directory('property-images')
                            ->visibility('public')
                            ->reorderable()
                            ->appendFiles()
                            ->maxFiles(3)
                            ->columnSpanFull()
                            ->helperText('Upload up to 3 images (recommended: 1200x800px)'),
                    ])
                    ->columnSpan(3)
                    ->collapsible(),
                Section::make('Documents')
                    ->description('Upload property documents and brochures.')
                    ->schema([
                        FileUpload::make('pdf')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('property-documents')
                            ->visibility('private')
                            ->helperText('Upload property brochure, floor plans, or other documents (PDF only)'),
                    ])
                    ->columnSpan(3)
                    ->collapsible(),
            ]);
    }
}
