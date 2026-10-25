<?php

use App\Helpers\ContactPhone;

it('normalizes the phone formats accepted by the reference Hub contract', function (string $input, string $expected) {
    expect(ContactPhone::normalize($input))->toBe($expected);
})->with([
    ['0512345678', '+966512345678'],
    ['512345678', '+966512345678'],
    ['+966 51 234 5678', '+966512345678'],
    ['00966-51-234-5678', '+966512345678'],
    ['+971 (50) 123-4567', '+971501234567'],
]);

it('rejects invalid or ambiguous phones', function (string $input) {
    expect(ContactPhone::normalize($input))->toBeNull();
})->with(['', 'abc', '0112345678', '+966112345678', '123', '+01234567890', '+9711234567890123456']);
