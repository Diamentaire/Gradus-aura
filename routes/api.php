<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConcoursController;
use App\Http\Controllers\Api\FormationController;

// Routes publiques
Route::get('/home', [HomeController::class, 'index']);
Route::get('/stats', [HomeController::class, 'stats']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/concours', [ConcoursController::class, 'index']);
Route::get('/concours/{id}', [ConcoursController::class, 'show']);

Route::get('/formations', [FormationController::class, 'index']);
Route::get('/formations/{id}', [FormationController::class, 'show']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::post('/concours/{id}/inscription', [ConcoursController::class, 'inscription']);
    Route::post('/formations/{id}/inscription', [FormationController::class, 'inscription']);
});
