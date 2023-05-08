<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubmissionController;
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
  Route::get('/students', 'index');
});

Route::group(['prefix' => 'exercises'], function () {
  Route::get('/', [ExerciseController::class, 'index']);
  Route::get('/{exercise_set}', [ExerciseController::class, 'show']);
});

Route::group(['prefix' => 'assignments', 'middleware' => 'auth'], function () {
  Route::post('/', [AssignmentController::class, 'create']);
});

Route::group(['prefix' => 'submissions', 'middleware' => 'auth'], function () {
  Route::get('/', [SubmissionController::class, 'index']);
  Route::post('/{submission}', [SubmissionController::class, 'show']);
  Route::post('/{submission}/submit', [SubmissionController::class, 'submit']);
});
