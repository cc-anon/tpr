<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CityController extends Controller{
  public function show($city) {
    return City::where('state', $city)->get();
  }
}
