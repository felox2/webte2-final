<?php

namespace App\Http\Controllers;

use App\Latex\ExerciseValidation;
use App\Models\Exercise;
use App\Models\Submission;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
  public function index()
  {
    $student = auth()->user();

    return [
      'current' => $student->submissions()
        ->with('assignment', function (Builder $q) {
          $q->with(['teacher' => function (Builder $q) {
            $q->select('id', 'first_name', 'last_name');
          }])
            ->select('id', 'title', 'description', 'max_points', 'start_date', 'end_date', 'teacher_id');
        })
        ->whereHas('assignment', function (Builder $q) {
          $q->where('start_date', '<', now()->utc())
            ->where(function (Builder $q) {
              $q->where('end_date', '>', now()->utc())
                ->orWhereNull('end_date');
            });
        })
        ->whereNull('provided_solution')
        ->select('id', 'assignment_id', 'points', 'provided_solution', 'exercise_id')
        ->get(),

      'past' => $student->submissions()
        ->with('assignment', function (Builder $q) {
          $q->with(['teacher' => function (Builder $q) {
            $q->select('id', 'first_name', 'last_name');
          }])
            ->select('id', 'title', 'description', 'max_points', 'start_date', 'end_date', 'teacher_id');
        })
        ->whereHas('assignment', function (Builder $q) {
          $q->where(function (Builder $q) {
            $q->where('end_date', '<', now()->utc());
          });
        })
        ->orWhereNotNull('provided_solution')
        ->select('id', 'assignment_id', 'points', 'provided_solution', 'exercise_id')
        ->get(),
    ];
  }

  public function show(Submission $submission)
  {
    $this->authorize('view', $submission);

    if ($submission->assignment->start_date > now()->utc()) {
      return response()->json(['message' => 'Assignment not found.'], 404);
    }

    $submission
      ->load([
        'assignment' => function (Builder $q) {
          $q->with(['teacher' => function (Builder $q) {
            $q->select('id', 'first_name', 'last_name');
          }])
            ->select('id', 'title', 'description', 'max_points', 'start_date', 'end_date', 'teacher_id', 'exercise_set_id');
        },
      ]);

    if (!$submission->exercise_id && (!$submission->assignment->end_date || $submission->assignment->end_date > now()->utc())) {
      // randomize exercise
      $submission->exercise_id = Exercise::where('exercise_set_id', $submission->assignment->exercise_set_id)
        ->inRandomOrder()
        ->pluck('id')
        ->first();
      $submission->save();
    }

    $to_load = 'exercise:id,task';
    if ($submission->assignment->end_date && $submission->assignment->end_date < now()->utc()) {
      $to_load .= ',solution';
    }

    $submission->load($to_load);

    return $submission;
  }

  // "hand in"
  public function submit(Submission $submission, Request $request)
  {
    $this->authorize('submit', $submission);

    $validated = $request->validate([
      'solution' => 'required|string',
    ]);

    // TODO: check if can submit
    // - check if not submitted
    // - check if not past end date
    // - check if not before start date

    $submission->load('assignment', 'exercise');

    if ($submission->assignment->start_date > now()->utc()) {
      return response()->json(['message' => 'Assignment not found.'], 404);
    }
    if ($submission->provided_solution) {
      return response()->json(['message' => 'Already submitted'], 400);
    }
    if ($submission->assignment->end_date && $submission->assignment->end_date < now()->utc()) {
      return response()->json(['message' => 'Assignment has ended'], 400);
    }

    $expected = $submission->exercise->solution;
    $actual = $validated['solution'];
    $correct = ExerciseValidation::validate($expected, $actual);

    $submission->provided_solution = $actual;
    $submission->points = $correct ? $submission->assignment->max_points : 0;
    $submission->save();

    if (!$submission->assignment->end_date || $submission->assignment->end_date > now()->utc()) {
      unset($submission->exercise->solution);
    }

    return $submission;
  }
}
