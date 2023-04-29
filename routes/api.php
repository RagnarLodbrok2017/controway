<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Users Route
Route::apiResource('/users', UserController::class);
Route::put('/users/approved/{id}', [UserController::class, 'updateApprove']);
Route::post('/products/import_excel', [ProductController::class, 'import']);
Route::get('/products/export_excel', [ProductController::class, 'export']);

//Products Route
Route::apiResource('/products', ProductController::class);

