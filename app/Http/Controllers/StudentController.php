<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
  public function index(Request $request): JsonResponse
  {
    $qParams = $request->query();

    $page = $qParams["page"] ?? 1;
    $pageSize = $qParams["size"] ?? 10;
    $sort = $qParams["sort"] ?? "id";
    $order = $qParams["order"] ?? "asc";
    $submissionDetails = $qParams["submissionDetails"] ?? false;

    if ($order !== "asc" && $order !== "desc") {
      $order = "asc";
    }

    if ($submissionDetails) {
      $students = $this->getStudentsWithSubmissionDetails([
        "page" => $page,
        "pageSize" => $pageSize,
        "sort" => $sort,
        "order" => $order
      ]);

      // Filter out unnecessary data
      $result = [
        "items" => $students->items(),
        "total" => $students->total(),
      ];

      return response()->json($result, 200);
    }

    $students = User::where("role", "student")->get();

    $result = [
      "items" => $students,
      "total" => count($students),
    ];

    return response()->json($result, 200);
  }

  public function show(string $id): JsonResponse
  {
    $student = User::where("role", "student")
      ->select("id", "first_name", "last_name", "email")
      ->find($id);

    if (!$student) {
      return response()->json(["message" => "Student not found."], 404);
    }

    $submissions = Submission::with(["assignment" => function ($query) {
      $query->select("id", "title", "description", "max_points", "start_date", "end_date");
    }])
      ->where("student_id", $id)
      ->select("id", "exercise_id", "assignment_id", "student_id", "points", "provided_solution")
      ->get();

    $result = [
      "student" => $student,
      "submissions" => [
        "items" => $submissions,
        "total" => count($submissions)
      ],
    ];

    return response()->json($result, 200);
  }

  private function getStudentsWithSubmissionDetails($params)
  {
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
      ->orderBy($params["sort"], $params["order"]);

    $numericColumns = ["id", "submissions_count", "submissions_count_provided_solution", "submissions_points_sum"];

    if (in_array($params["sort"], $numericColumns)) {
      $studentsQuery = $studentsQuery->orderBy("last_name", $params["order"]);
    }

    return $studentsQuery
      ->paginate($params["pageSize"], ["*"], "page", $params["page"]);
  }
}
