<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class UserController extends Controller
{
  public function login(Request $request) {
    $credentials = $request->only('email', 'password');
    if (Auth::attempt($credentials)) {
      $request->session()->regenerate();
      return response()->json(null, 204);
    }
    return response()->json(null, 401);
  }

  public function logout(){
    Auth::logout();
    return response()->json(null, 204);
  }
}
