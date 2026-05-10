<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route unique pour toutes les pages du SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');