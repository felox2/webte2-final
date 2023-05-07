<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\StudentController;
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

require __DIR__ . '/auth.php';

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->get('/user', function (Request $request) {
  return $request->user();
});

// TODO: secure routes (auth and roles) (maybe https://laravel.com/docs/10.x/authorization#creating-policies)
Route::controller(StudentController::class)->group(function () {
  Route::get('/students', 'getAllStudents');
});
