<?php

namespace App\Http\Controllers;

use App\Models\Region;
use App\Models\Transporter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransporterController extends Controller{
  public function index() {
    return Transporter::addSelect(['state' => Region::select('state')
      ->whereColumn('id', 'transporters.region')
      ->limit(1),
    'city' => Region::select('city')
      ->whereColumn('id', 'transporters.region')
      ->limit(1)
    ])->get();
  }

  public function show(Transporter $transporter) {
    return $transporter;
  }

  public function store(Request $request) {
    $transporter = Transporter::create($request->all());
    return response()->json($transporter, 201);
  }

  public function update(Request $request, Transporter $transporter) {
    $transporter->update($request->all());
    return response()->json($transporter, 200);
  }

  public function delete(Transporter $transporter) {
    $transporter->delete();
    return response()->json(null, 204);
  }
}
