<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assignment extends Model
{
  protected $table = 'assignment_info';

  protected $fillable = [
    'teacher_id',
    'title',
    'description',
    'exercise_set_id',
    'max_points',
    'start_date',
    'end_date',
  ];

  public function teacher(): BelongsTo
  {
    return $this->belongsTo(User::class, 'teacher_id');
  }

  public function exerciseSet(): BelongsTo
  {
    return $this->belongsTo(ExerciseSet::class, 'exercise_set_id');
  }

  public function submissions(): HasMany
  {
    return $this->hasMany(Submission::class, 'submission_id');
  }
}
