<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\TruckController;

Route::get('/login', function () {return view('login');})->name("login");
Route::middleware('auth:sanctum')->get('/{user}/{module}/{page}', function (Request $request) {return view($request->user.'.'.$request->module.'.'.$request->page);});
