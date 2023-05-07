<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAssignmentRequest extends FormRequest
{
  public function rules(): array
  {
    return [
      'title' => ['required', 'string'],
      'description' => ['required', 'string'],
      'exercise_set_id' => ['required', 'exists:exercise_sets,id'],
      'student_ids' => ['nullable', 'array'],
      'student_ids.*' => ['required', 'exists:users,id'],
      'start_date' => ['sometimes', 'date', 'before:end_date'],
      'end_date' => ['sometimes', 'date', 'after:start_date'],
      'max_points' => ['required', 'numeric', 'min:0.01'],
    ];
  }
}
