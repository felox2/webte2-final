<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
  public function getAllStudents(Request $request): JsonResponse
  {
    $qParams = $request->query();

    $page = $qParams["page"] ?? 1;
    $pageSize = $qParams["size"] ?? 10;
    $sort = $qParams["sort"] ?? "id";
    $order = $qParams["order"] ?? "asc";

    if ($order !== "asc" && $order !== "desc") {
      $order = "asc";
    }

    $studentsQuery = User::where("role", "student")
      ->withCount([
        "submissions" => function ($query) {
          $query->whereNotNull("exercise_id");
        },
        "submissions as submissions_count_provided_solution" => function ($query) {
          $query->whereNotNull("provided_solution");
        },
        "submissions as submissions_points_sum" => function ($query) {
          $query->select(DB::raw("COALESCE(sum(points), 0) as submissions_points_sum"))->whereNotNull("provided_solution");
        },
      ])
      ->orderBy($sort, $order);

    $numericColumns = ["id", "submissions_count", "submissions_count_provided_solution", "submissions_points_sum"];

    if (in_array($sort, $numericColumns)) {
      $studentsQuery = $studentsQuery->orderBy("last_name", $order);
    }

    $students = $studentsQuery
      ->paginate($pageSize, ["*"], "page", $page);

    // Filter out unnecessary data
    $result = [
      "items" => $students->items(),
      "total" => $students->total(),
    ];

    return response()->json($result, 200);
  }
}
