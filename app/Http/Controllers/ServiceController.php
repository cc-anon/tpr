<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceController extends Controller{
  public function show($service) {
    return Service::where('transporter', $service)->get();
  }

  public function store(Request $request) {
    $service = Service::create($request->all());
    return response()->json($service, 201);
  }

  public function delete($service) {
    Service::where('transporter', $service)->delete();
    return response()->json(null, 204);
  }
}
