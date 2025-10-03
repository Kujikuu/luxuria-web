<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/properties', function () {
    return Inertia::render('Listings');
})->name('properties');

Route::get('/properties/{slug}', function () {
    return Inertia::render('Listings/[slug]');
})->name('properties.slug');
    