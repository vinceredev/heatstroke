<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::controller(StaffController::class)->group(function () {
        Route::get('staffs', 'index')->name('staff.index')->middleware('can:view staff');
        Route::post('staffs', 'store')->name('staff.store')->middleware(['can:add staff']);
        Route::get('staffs/{id}', 'edit')->name('staff.edit')->middleware(['can:edit staff', 'can:edit other staff']);
        Route::patch('staffs/{id}', 'update')->name('staff.update')->middleware(['can:edit staff', 'can:edit other staff']);
        Route::delete('staffs', 'destroy')->name('staff.destroy')->middleware(['can:delete staff']);
    });

    Route::controller(RoleController::class)->group(function () {
        Route::get('roles', 'index')->name('role.index')->middleware('can:view role');
        Route::post('roles', 'store')->name('role.store')->middleware(['can:add role']);
        Route::get('roles/{id}', 'edit')->name('role.edit')->middleware(['can:edit role']);
        Route::patch('roles/{id}', 'update')->name('role.update')->middleware(['can:edit role']);
        Route::delete('roles', 'destroy')->name('role.destroy')->middleware(['can:delete role']);
    });
});

Route::controller(InvitationController::class)->group(function() {
    Route::get('invitation/{token}', 'edit')->name('invitation.edit');
    Route::patch('invitation/{token}', 'update')->name('invitation.update');
});

require __DIR__ . '/auth.php';
