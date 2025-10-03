<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyInquiryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'featuredProperties' => PropertyController::getFeaturedProperties(),
    ]);
})->name('home');

Route::get('/properties', [PropertyController::class, 'index'])->name('properties');
Route::get('/properties/{slug}', [PropertyController::class, 'show'])->name('properties.show');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::post('/property-inquiries', [PropertyInquiryController::class, 'store'])->name('property-inquiries.store');
Route::post('/contact-inquiries', [ContactInquiryController::class, 'store'])->name('contact-inquiries.store');
