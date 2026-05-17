<?php

it('uses direction-aware classes for the language switcher menu', function () {
    $component = file_get_contents(resource_path('js/components/LanguageSwitcher.tsx'));

    expect($component)
        ->toContain('dir={direction}')
        ->toContain('inset-e-0')
        ->toContain('text-start')
        ->toContain('ms-')
        ->toContain('me-')
        ->not->toContain('right-0')
        ->not->toContain('text-left')
        ->not->toContain('mr-')
        ->not->toContain('ml-');
});
