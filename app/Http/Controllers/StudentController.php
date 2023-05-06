<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudentController extends Controller
{
  public function getAllStudents(Request $request)
  {
    $qParams = $request->query();

    $page = $qParams['page'] ?? 1;
    $pageSize = $qParams['size'] ?? 10;
    $sort = $qParams['sort'] ?? 'id';
    $order = $qParams['order'] ?? 'asc';

    // Just to test frontend
    $students = [
      [
        "id" => 1,
        "firstname" => "Janko",
        "lastname" => "Hrasko",
        "email" => "janko@hrasko.com",
        "generatedAssignmentCount" => 3,
        "handedInAssignmentCount" => 2,
        "earnedPointCount" => 20,
        "totalPointCount" => 20,
        "successRate" => 0.66
      ],
      [
        "id" => 2,
        "firstname" => "Samko",
        "lastname" => "Rozko",
        "email" => "janko@hrasko.com",
        "generatedAssignmentCount" => 3,
        "handedInAssignmentCount" => 2,
        "earnedPointCount" => 20,
        "totalPointCount" => 20,
        "successRate" => 0.66
      ],
      [
        "id" => 3,
        "firstname" => "Zuzka",
        "lastname" => "Ferko",
        "email" => "janko@hrasko.com",
        "generatedAssignmentCount" => 3,
        "handedInAssignmentCount" => 2,
        "earnedPointCount" => 20,
        "totalPointCount" => 20,
        "successRate" => 0.66
      ],
    ];

    if ($sort === "id") {
      if ($order === "asc") {
        usort($students, function ($a, $b) {
          return $a['id'] <=> $b['id'];
        });
      }
      else {
        usort($students, function ($a, $b) {
          return $b['id'] <=> $a['id'];
        });
      }
    }

    return response()->json($students, 200);
  }
}
