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

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');

Route::get('/blog/{slug}', function () {
    return Inertia::render('Blog/[slug]');
})->name('blog.slug');
