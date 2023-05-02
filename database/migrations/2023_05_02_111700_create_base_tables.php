<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('exercise_sets', function (Blueprint $table) {
      $table->id();
      $table->string('file_path');
      $table->string('hash');
      $table->timestamps();
    });

    Schema::create('exercises', function (Blueprint $table) {
      $table->id();
      $table->string('task');
      $table->string('solution');
      $table->foreignId('exercise_set_id')->constrained();
      $table->timestamps();
    });

    Schema::create('assignments', function (Blueprint $table) {
      $table->id();
      $table->foreignId('teacher_id')->constrained('users');
      $table->foreignId('student_id')->constrained('users');
      $table->foreignId('exercise_set_id')->constrained();
      $table->foreignId('exercise_id')->nullable()->constrained();
      $table->float('max_points', 8, 3);
      $table->float('points', 8, 3)->nullable();
      $table->timestamp('start_date')->nullable();
      $table->timestamp('end_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('assignments');

    Schema::dropIfExists('exercises');

    Schema::dropIfExists('exercise_sets');
  }
};
