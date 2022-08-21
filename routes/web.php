<?php

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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

Route::post('/logout', [AuthenticationController::class, 'logout'])->name('logout');
Route::get('/login', [AuthenticationController::class, 'showLoginForm'])->name('showLoginForm');
Route::post('/login', [AuthenticationController::class, 'Login'])->name('login');

Route::middleware('auth')->group(function(){
    Route::get('/user',[UserController::class,'index'])->name('user.index');
    Route::get('/user/{user}',[UserController::class,'show']);
    Route::post('/user',[UserController::class,'store']);
    Route::post('/user/update/{user}',[UserController::class,'update']);
    Route::delete('/user/{user}',[UserController::class,'destroy']);
    //end of user
    //role routes
    Route::get('/role',[RoleController::class,'index'])->name('role.index');
    Route::get('/role/{role}',[RoleController::class,'show']);
    Route::post('/role',[RoleController::class,'store']);
    Route::post('/role/update/{role}',[RoleController::class,'update']);
    Route::delete('/role/{role}',[RoleController::class,'destroy']);
    //end of user

    //outlet routes
    Route::get('/outlet',[OutletController::class,'index'])->name('outlet.index');
    Route::get('/get/outlets',[OutletController::class,'getOutlets']);
    Route::get('/outlet/{outlet}',[OutletController::class,'show']);
    Route::get('/outlet-activities',[OutletController::class,'outlet_activities'])->name('outlet_activities.index');
    Route::post('/outlet',[OutletController::class,'store']);
    Route::post('/outlet/update/{outlet}',[OutletController::class,'update']);
    Route::delete('/outlet/{outlet}',[OutletController::class,'destroy']);
    //end of user

});




