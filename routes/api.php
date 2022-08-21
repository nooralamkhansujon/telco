<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\OutletApiController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthApiController::class,'login'])->name('login');
    Route::post('register', [AuthApiController::class,'login']);
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout',  [AuthApiController::class,'logout']);
        Route::get('user',  [AuthApiController::class,'user']);
   });
});

Route::group(['middleware' => 'auth:api'],function(){
    Route::get('/outlets',[OutletApiController::class,'index']);
    Route::post('/outlet/{outlet_id}',[OutletApiController::class,'updateOutlet']);
    Route::post('/outlet/activity/{outlet_id}',[OutletApiController::class,'storeOutletActivity']);
});
