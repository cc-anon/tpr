<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BankController extends Controller{
  public function show($bank) {
    return Bank::where('transporter', $bank)->get();
  }

  public function store(Request $request) {
    $bank = Bank::create($request->all());
    return response()->json($bank, 201);
  }

  public function update(Request $request, Bank $bank) {
    $bank->update($request->all());
    return response()->json($bank, 200);
  }

  public function delete($bank) {
    Bank::where('transporter', $bank)->delete();
    return response()->json(null, 204);
  }
}
