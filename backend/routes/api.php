<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ApiTokenAuth;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PuenteController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Profile API
Route::middleware(ApiTokenAuth::class)->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

// Auth API
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware(ApiTokenAuth::class)->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Rutas de la API de Puentes
Route::get('/puentes', [PuenteController::class, 'index']);
Route::get('/puentes/{id}', [PuenteController::class, 'show']);

// CRUD de usuarios y puentes (protegidos por token)
Route::middleware(ApiTokenAuth::class)->group(function () {
    Route::post('/puentes', [PuenteController::class, 'store']);

    Route::get('/users', [UserController::class, 'index'])->middleware('permission:users.view');
    Route::post('/users', [UserController::class, 'store'])->middleware('permission:users.create');
    Route::get('/users/{user}', [UserController::class, 'show'])->middleware('permission:users.view');
    Route::put('/users/{user}', [UserController::class, 'update'])->middleware('permission:users.update');
    Route::patch('/users/{user}', [UserController::class, 'update'])->middleware('permission:users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->middleware('permission:users.delete');
    Route::post('/users/{user}/roles', [UserController::class, 'syncRoles'])->middleware('permission:roles.manage');

    Route::apiResource('roles', RoleController::class)->middleware('permission:roles.manage');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'syncPermissions'])->middleware('permission:roles.manage');

    Route::apiResource('permissions', PermissionController::class)->middleware('permission:permissions.manage');
});
