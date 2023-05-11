<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Parsedown;

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
      return $this->getPdf($fileName);
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

  private function getPdf(string $fileName)
  {
    $filePath = "docs/$fileName";

    if (!Storage::disk('local')->exists($filePath)) {
      return response('Pdf Docs Not found', 404);
    }

    $parsedown = new Parsedown();
    $markdown = Storage::disk('local')->get($filePath);
    $html = $parsedown->text($markdown);

    $dompdf = new \Dompdf\Dompdf();
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->loadHtml($html);
    $dompdf->render();

    $output = $dompdf->output();

    return response($output, 200, [
      'Content-Type' => 'application/pdf',
      'Content-Disposition' => 'attachment; filename="docs.pdf"'
    ]);
  }
}
