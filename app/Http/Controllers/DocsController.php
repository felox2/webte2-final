<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocsController extends Controller
{
  public function show(Request $request, string $role)
  {
    $acceptHeader = $request->getAcceptableContentTypes();

    $fileName = match ($role) {
      'student' => 'guide_student.md',
      'teacher' => 'guide_teacher.md',
      'admin' => 'guide_admin.md',
      default => null,
    };

    if ($fileName === null) {
      return response("Markdown Docs For $role Not Found", 404);
    }

    if (in_array("text/markdown", $acceptHeader)) {
      return $this->getMarkdown($fileName);
    }

    if (in_array("application/pdf", $acceptHeader)) {
      // TODO: Implement PDF generation
      return response('Not Implemented', 501);
    }

    return response('Not Acceptable', 406);
  }

  // TODO: Maybe one time next time
  // public function edit() {}

  private function getMarkdown(string $fileName)
  {
    $filePath = "docs/$fileName";

    if (!Storage::disk('local')->exists($filePath)) {
      return response('Markdown Docs Not found', 404);
    }

    $content = Storage::disk('local')->get($filePath);

    return response($content, 200, [
      'Content-Type' => 'text/markdown'
    ]);
  }
}
