<?php

namespace App\Policies;

use App\Models\Submission;
use App\Models\User;

class SubmissionPolicy
{
  public function before(User $user, string $ability): ?bool
  {
    if ($user->role === 'teacher' || $user->role === 'admin') {
      return true;
    }
    return null;
  }

  public function view(User $user, Submission $submission): bool
  {
    return $user->id === $submission->student_id;
  }

  public function submit(User $user, Submission $submission): bool
  {
    return $user->id === $submission->student_id;
  }
}
