<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::group(['prefix' => 'contacts'], function () {
        Route::get('/', [ContactController::class, 'index'])->name('contacts.index');
    });

    Route::group(['prefix' => 'organizations'], function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('organizations.index');
    });

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
    });

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/me', function () {
            return Inertia::render('profile/index');
        })->name('profile.me');

        Route::post('/me', [UserController::class, 'update'])->name('profile.update');

        Route::get('/appearance', function () {
            return Inertia::render('profile/appearance');
        })->name('profile.appearance');

        Route::get('/password', function () {
            return Inertia::render('profile/password');
        })->name('profile.password');

        Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
    });
});

require __DIR__.'/auth.php';
