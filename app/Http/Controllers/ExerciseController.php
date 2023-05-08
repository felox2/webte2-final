<?php

namespace App\Http\Controllers;

use App\Latex\LatexExercisesParser;
use App\Models\ExerciseSet;
use Illuminate\Http\JsonResponse;

class ExerciseController extends Controller
{
  public function index(): JsonResponse
  {
    $root = storage_path('app');
    $files = scandir($root);
    $files = array_filter($files, function ($file) {
      return str_ends_with($file, '.tex');
    });

    $exercise_sets = [];

    $result = [
      "items" => [],
      "total" => 0
    ];

    foreach ($files as &$file) {
      $path = $root . '/' . $file;
      $content = file_get_contents($path);
      $hash = md5($content);

      $exercise_set = ExerciseSet::where('hash', $hash)->first();

      if (!$exercise_set || $exercise_set->hash !== $hash) {
        $exercise_set = ExerciseSet::create([
          'file_path' => $path,
          'hash' => $hash,
        ]);

        $parser = new LatexExercisesParser($path);
        $result = $parser->parse();

        foreach ($result as $exercise) {
          $exercise_set->exercises()->create([
            'task' => $exercise['task'],
            'solution' => $exercise['solution'],
            'exercise_set_id' => $exercise_set->id,
          ]);
          $exercise_set->save();
        }
      }

      $exercise_sets[] = $exercise_set;
      $result["items"][] = [
        "id" => $exercise_set->id,
        "file_name" => basename($exercise_set->file_path),
        "created_at" => $exercise_set->created_at,
      ];
      $result["total"] += 1;
    }

    return response()->json($result);
  }

  public function show(ExerciseSet $exercise_set): JsonResponse
  {
    return response()->json($exercise_set->load('exercises'));
  }
}
