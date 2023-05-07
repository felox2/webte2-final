<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Models\Assignment;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AssignmentController extends Controller
{
  public function create(CreateAssignmentRequest $request): JsonResponse
  {
    $validated = $request->validated();
    $user = auth()->user();
    $student_ids = $validated['student_ids'] ?? User::where('role', 'student')->pluck('id')->toArray();
    $assignment = Assignment::create([
      'teacher_id' => $user->id,
      'title' => $validated['title'],
      'description' => $validated['description'],
      'exercise_set_id' => $validated['exercise_set_id'],
      'max_points' => $validated['max_points'],
      'start_date' => $validated['start_date'] ?? now(),
      'end_date' => $validated['end_date'] ?? null,
    ]);

    foreach ($student_ids as $student_id) {
      $assignment->submissions()->create([
        'student_id' => $student_id,
      ]);
    }

    return response()->json($assignment);
  }
}
