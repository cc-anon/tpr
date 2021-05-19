<?php

namespace App\Http\Controllers;

use App\Models\Truck;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TruckController extends Controller {
  public function index() {
    return Truck::all();
  }

  public function show(Truck $truck) {
    return $truck;
  }

  public function store(Request $request) {
    $truck = Truck::create($request->all());
    return response()->json($truck, 201);
  }

  public function update(Request $request, Truck $truck) {
    $truck->update($request->all());
    return response()->json($truck, 200);
  }

  public function delete(Truck $truck) {
    $truck->delete();
    return response()->json(null, 204);
  }
}
