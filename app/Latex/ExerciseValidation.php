<?php

namespace App\Latex;

use App\Models\Assignment;
use App\Models\Exercise;

class ExerciseValidation
{
  public static function validate(Exercise $exercise, Assignment $assignment): bool
  {
    $expected = $exercise->solution;
    $actual = $assignment->provided_solution;

    if (!$actual) {
      return false;
    }

    $result = exec('python ../scripts/validate.py "' . $expected . '" "' . $actual . '"', $output);

    if ($result === 'True') {
      return true;
    }

    return false;
  }
}
