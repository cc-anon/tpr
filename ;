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
            <input type="hidden" id="transporterid" value="" />
            <a href="#" data-toggle="dropdown" data-display="static"><i class="align-middle" data-feather="more-horizontal"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" id="edittransporteranchor">Edit</a>
                <a href="#deletetransportermodal" class="dropdown-item" data-toggle="modal" data-traget="#deletetransportermodal">Delete</a>
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
        <h5 class="h6 card-title">Head Branch</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1"><a href="#" id="headbranch"></a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div class="accordion" id="extraview">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title my-2" id="serviceheading">
            <a href="#" data-toggle="collapse" data-target="#services" aria-expanded="true" aria-controls="services">Services</a>
          </h5>
        </div>
        <div id="services" class="collapse show" aria-labelledby="serviceheading" data-parent="#extraview">
          <div class="card-body">
            <table class="table table-striped" style="table-layout:fixed; width:100%">
              <thead>
                <tr>
                  <th style="width: 15%">From State</th>
                  <th style="width: 10%">From Cities</th>
                  <th style="width: 15%">To State</th>
                  <th style="width: 10%">To Cities</th>
                  <th style="width: 40%">Trucks</th>
                  <th style="width: 20%">Commodity</th>
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
          <h5 class="card-title my-2" id="contactsheading">
            <a href="#" data-toggle="collapse" data-target="#contacts" aria-expanded="true" aria-controls="contacts">Contacts</a>
          </h5>
        </div>
        <div id="contacts" class="collapse" aria-labelledby="contactsheading" data-parent="#extraview">
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
              @for ($i = 1; $i <= 5; $i++)
              <tr><td id="viewname{{$i}}"></td><td id="viewmobile1{{$i}}"></td><td id="viewmobile2{{$i}}"></td><td id="viewwhatsapp{{$i}}"></td></tr>
              @endfor
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
              @for ($i = 1; $i <= 5; $i++)
              <tr><td id="holdername{{$i}}"></td><td id="accountnumber{{$i}}"></td><td id="bankname{{$i}}"></td><td id="bankbranch{{$i}}"></td><td id="ifsccode{{$i}}"></td></tr>
              @endfor
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
<div class="modal fade" id="deletetransportermodal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body m-3">
        <div class="mb-0">
          <p><strong>Are you sure you want to delete this Transporter?</strong></p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="deletetransporterconfirm" type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
@stop
