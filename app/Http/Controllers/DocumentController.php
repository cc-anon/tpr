<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller{
  public function show(Document $document) {
    return $document;
  }

  public function multiple(Request $request) {
    return Document::whereIn('id', $request->documents)->get();
  }

  public function store(Request $request) {
    $count = count($request->file('path'));
    $returnArray = [];
    for ($i = 0; $i < $count; $i++) {
      $document = Document::create(['path' => basename(Storage::putFile('public', $request->file('path')[$i], 'public'))]);
      $returnArray[] = $document;
    }

    return response()->json($returnArray, 201);
  }

  public function delete(Document $document) {
    $document->delete();
    return response()->json(null, 204);
  }
}
