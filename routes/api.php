<?php

use App\Http\Controllers\StudentController;
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

// TODO: secure routes (auth and roles) (maybe https://laravel.com/docs/10.x/authorization#creating-policies)
Route::controller(StudentController::class)->group(function () {
  Route::get('/students', 'getAllStudents');
});
