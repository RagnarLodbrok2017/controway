<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::get('/login', [AuthController::class, 'loginView'])->name('loginView');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'registerView'])->name('registerView');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
//Auth::routes();


Route::middleware(['auth:sanctum','checkApproved'])->group(function () {

    Route::get('/home', function (){
        return view('home.index');
    })->name('user.home');

    Route::prefix('/dashboard')->group(function () {

        Route::any('/{any?}', function () {
            return view('dashboard.layouts.app');
        })->where(['any' => '.*'])->name('admin.dashboard');

    });
});

//Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'view_dashboard'])->name('dashboard');
