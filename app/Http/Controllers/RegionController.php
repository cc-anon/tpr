<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegionController extends Controller{
  public function index() {
    return Region::select('id', 'state')->groupby('state')->get();
  }
  public function show(Region $region) {
    return Region::select('id', 'city')->where('state', $region->state)->get();
  }
  public function view(Region $region) {
    return $region;
  }
}
