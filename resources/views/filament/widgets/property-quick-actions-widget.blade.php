@php
    use Filament\Actions\StaticAction;
@endphp

<div class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {{ $this->duplicatePropertyAction }}
        {{ $this->toggleFeaturedAction }}
        {{ $this->bulkUpdatePriceAction }}
        {{ $this->markAsSoldAction }}
    </div>
</div>