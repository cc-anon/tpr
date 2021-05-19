<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactController extends Controller{
  public function show($contact) {
    return Contact::where('transporter', $contact)->get();
  }

  public function store(Request $request) {
    $contact = Contact::create($request->all());
    return response()->json($contact, 201);
  }

  public function update(request $request, contact $Contact) {
    $contact->update($request->all());
    return response()->json($contact, 200);
  }

  public function delete($contact) {
    Contact::where('transporter', $contact)->delete();
    return response()->json(null, 204);
  }
}
