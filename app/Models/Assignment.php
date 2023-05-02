<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
  use HasFactory;

  protected $fillable = [
    'max_points',
    'start_date',
    'end_date',
  ];

  public function teacher(): BelongsTo
  {
    return $this->belongsTo(User::class, 'teacher_id');
  }

  public function student(): BelongsTo
  {
    return $this->belongsTo(User::class, 'student_id');
  }

  public function exerciseSet(): BelongsTo
  {
    return $this->belongsTo(ExerciseSet::class);
  }

  public function exercise(): BelongsTo
  {
    return $this->belongsTo(Exercise::class);
  }
}
