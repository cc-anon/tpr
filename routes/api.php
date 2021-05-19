<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['web']], function () {
  Route::post('login', 'App\Http\Controllers\UserController@login');
  Route::get('logout', 'App\Http\Controllers\UserController@logout');
});


Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::get('trucks', 'App\Http\Controllers\TruckController@index');
  Route::get('trucks/{truck}', 'App\Http\Controllers\TruckController@show');
  Route::post('trucks', 'App\Http\Controllers\TruckController@store');
  Route::put('trucks/{truck}', 'App\Http\Controllers\TruckController@update');
  Route::delete('trucks/{truck}', 'App\Http\Controllers\TruckController@delete');

  Route::get('transporters', 'App\Http\Controllers\TransporterController@index');
  Route::get('transporters/{transporter}', 'App\Http\Controllers\TransporterController@show');
  Route::post('transporters', 'App\Http\Controllers\TransporterController@store');
  Route::put('transporters/{transporter}', 'App\Http\Controllers\TransporterController@update');
  Route::delete('transporters/{transporter}', 'App\Http\Controllers\TransporterController@delete');

  Route::get('regions', 'App\Http\Controllers\RegionController@index');
  Route::get('regions/{region}', 'App\Http\Controllers\RegionController@show');
  Route::get('regions/view/{region}', 'App\Http\Controllers\RegionController@view');

  Route::get('documents/{document}', 'App\Http\Controllers\DocumentController@show');
  Route::post('documents/multiple', 'App\Http\Controllers\DocumentController@multiple');
  Route::post('documents', 'App\Http\Controllers\DocumentController@store');
  Route::delete('documents/{document}', 'App\Http\Controllers\DocumentController@delete');

  Route::get('contacts/{contact}', 'App\Http\Controllers\ContactController@show');
  Route::post('contacts', 'App\Http\Controllers\ContactController@store');
  Route::put('contacts/{contact}', 'App\Http\Controllers\ContactController@update');
  Route::delete('contacts/{contact}', 'App\Http\Controllers\ContactController@delete');

  Route::get('services/{service}', 'App\Http\Controllers\ServiceController@show');
  Route::post('services', 'App\Http\Controllers\ServiceController@store');
  Route::delete('services/{service}', 'App\Http\Controllers\ServiceController@delete');

  Route::get('banks/{bank}', 'App\Http\Controllers\BankController@show');
  Route::post('banks', 'App\Http\Controllers\BankController@store');
  Route::put('banks/{bank}', 'App\Http\Controllers\BankController@update');
  Route::delete('banks/{bank}', 'App\Http\Controllers\BankController@delete');
});
