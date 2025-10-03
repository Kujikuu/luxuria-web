<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Blog Information')
                    ->description('Manage the blog post basic information.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null)
                                    ->placeholder('Enter blog post title'),
                                TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->placeholder('auto-generated-slug'),
                            ]),
                        Textarea::make('about')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->placeholder('Write a brief description or excerpt of the blog post...'),
                    ]),
                Section::make('Publishing Details')
                    ->description('Set publishing information and metadata.')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Select::make('author_id')
                                    ->relationship('author', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        TextInput::make('name')
                                            ->required(),
                                        TextInput::make('role')
                                            ->required(),
                                        Textarea::make('about'),
                                    ])
                                    ->placeholder('Select or create author'),
                                TextInput::make('read_time')
                                    ->required()
                                    ->numeric()
                                    ->suffix('minutes')
                                    ->placeholder('5')
                                    ->helperText('Estimated reading time in minutes'),
                                DateTimePicker::make('publish_date')
                                    ->required()
                                    ->default(now())
                                    ->native(false)
                                    ->displayFormat('M d, Y H:i')
                                    ->placeholder('Select publish date and time'),
                            ]),
                    ]),
                Section::make('Featured Image')
                    ->description('Upload a featured image for the blog post.')
                    ->schema([
                        FileUpload::make('featured_image')
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->directory('blog-images')
                            ->visibility('public')
                            ->columnSpanFull()
                            ->helperText('Upload a featured image (recommended: 1200x675px for 16:9 ratio)'),
                    ])
                    ->collapsible(),
                Section::make('Content')
                    ->description('Write the main content of your blog post.')
                    ->schema([
                        RichEditor::make('content')
                            ->required()
                            ->columnSpanFull()
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
                            ->placeholder('Start writing your blog post content...'),
                    ]),
            ]);
    }
}
