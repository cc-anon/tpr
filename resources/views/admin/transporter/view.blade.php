@extends('layouts.layout')
@section('content')
<div class="container-fluid p-0">
<h1 class="h3 mb-3">Transporter</h1>
<div class="row">
  <div class="col-md-4">
    <div class="card mb-3">
      <div class="card-header">
        <div class="card-actions float-right">
          <div class="dropdown show">
            <a href="#" data-toggle="dropdown" data-display="static"><i class="align-middle" data-feather="more-horizontal"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" id="edittransporteranchor">Edit</a>
              <a class="dropdown-item" href="#">Delete</a>
            </div>
          </div>
        </div>
        <h5 class="card-title mb-0">Transporter Details</h5>
      </div>
      <div class="card-body text-center">
        <div class="text-center">
            <div id="viewvisitingcardcarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner" id="viewvisitingcardcarouselinner">
              </div>
              <a class="carousel-control-prev" href="#visitingcardcarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#visitingcardcarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
        </div>
        <h5 id="viewbusinessname" class="card-title mb-0"></h5>
        <b><div id="viewownername" class="text-muted mb-2"></div></b>
        <div>
          <a class="btn btn-primary btn-sm" href="#"><span data-feather="message-square"></span> Message</a>
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">Contact</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1">What's App Number <a href="#" id="viewwhatsappnumber" onclick="copyURI(event)"></a></li>
          <li class="mb-1">Email Address <a href="#" id="viewemailaddress" onclick="copyURI(event)"></a></li>
          <li class="mb-1">Address <a href="#" id="viewaddress" onclick="copyURI(event)"></a></li>
          <li class="mb-1">Referred By<a href="#" id="viewreferrername" onclick="copyURI(event)"></a></li>
          <li class="mb-1">Aadhar <a href="#" id="viewaadhar" onclick="copyURI(event)"></a> PAN <a href="#" id="viewpan" onclick="copyURI(event)"></a> GST <a href="#" id="viewgst" onclick="copyURI(event)"></a></li>
        </ul>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">References</h5>
        <ul class="list-unstyled mb-0">
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div class="accordion" id="extraview">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title my-2" id="contactsheading">
            <a href="#" data-toggle="collapse" data-target="#contacts" aria-expanded="true" aria-controls="contacts">Contacts</a>
          </h5>
        </div>
        <div id="contacts" class="collapse show" aria-labelledby="contactsheading" data-parent="#extraview">
          <div class="card-body">
          <table id="contacttable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>WhatsApp Number</th>
                <th>Mobile Number</th>
                <th>Aternate Mobile</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title my-2" id="serviceheading">
            <a href="#" data-toggle="collapse" data-target="#services" aria-expanded="true" aria-controls="services">Services</a>
          </h5>
        </div>
        <div id="services" class="collapse" aria-labelledby="serviceheading" data-parent="#extraview">
          <div class="card-body">
            <table class="table table-striped" style="width:100%">
              <thead>
                <tr>
                  <th style="width: 10%">From State</th>
                  <th style="width: 20%">From Cities</th>
                  <th style="width: 10%">To State</th>
                  <th style="width: 20%">To Cities</th>
                  <th style="width: 30%">Trucks</th>
                  <th style="width: 10%">Commodities</th>
                </tr>
              </thead>
              @for ($i = 1; $i <= 5; $i++)
              <tr><td id="fromstate{{$i}}"></td><td id="fromcities{{$i}}"></td><td id="tostate{{$i}}"></td><td id="tocities{{$i}}"></td><td id="trucks{{$i}}"></td><td id="commodities{{$i}}"></td></tr>
              @endfor
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title my-2" id="banksheading">
            <a href="#" data-toggle="collapse" data-target="#banks" aria-expanded="true" aria-controls="banks">Banks</a>
          </h5>
        </div>
        <div id="banks" class="collapse" aria-labelledby="banksheading" data-parent="#extraview">
          <div class="card-body">
          <table id="banktable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th>Holder Name</th>
                <th>Account Number</th>
                <th>Name</th>
                <th>Branch</th>
                <th>IFSC Code</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title my-2" id="documentsheading">
            <a href="#" data-toggle="collapse" data-target="#documents" aria-expanded="true" aria-controls="documents">Documents</a>
          </h5>
        </div>
        <div id="documents" class="collapse" aria-labelledby="documentsheading" data-parent="#extraview">
          <div class="card-body">
            <div id="viewdocumentfill" class="row">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
@stop
