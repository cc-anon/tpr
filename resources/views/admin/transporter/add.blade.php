@extends('layouts.layout')
@section('content')
<div class="modal fade" id="transportermodal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Please make following changes</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body m-3">
        <div id="transportermodalcontent" class="mb-0"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid p-0">
  <div class="row mb-2 mb-xl-3">
    <div class="col-auto d-none d-sm-block"><h3>Add Transporter</h3></div>
    <div class="col-auto ml-auto text-right mt-n1">
      <input type="hidden" id="transporterid" value="">
      <button id="addtransportertodatabase" class="btn btn-primary shadow-sm">
        <i class="align-middle" data-feather="file-plus"></i>
        Save Transporter
      </button>
    </div>
    <div class="col-md-12 mt-4">
      <div class="tab-content">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Details</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="basiccitystate" class="form-control selectstate" required></select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputCity">City</label>
                    <select id="basiccity" class="form-control selectcity" required></select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputArea">Area</label>
                    <input type="text" id="basicarea" class="form-control" />
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputType">Type</label>
                    <select class="form-control" id="transportertype">
                      <option value="Owner">Owner</option>
                      <option value="Broker">Broker</option>
                      <option value="Booking">Booking</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputbranch">Branch</label>
                    <select class="form-control" id="isbranch"></select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputRatings">Ratings</label>
                    <select class="form-control" id="ratings">
                      <option value="5">Very Good</option>
                      <option value="4">Good</option>
                      <option value="3">Normal</option>
                      <option value="2">Okay</option>
                      <option value="1">Bad</option>
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputDocument">Documents</label>
                    <input id="documents" class="form-control btn btn-primary instantsave" type="file" multiple />
                    <input type="hidden" id="documentsid" value="" />
                    <input type="hidden" id="documentsstring" value="" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="trasportername">Transporter Name</label>
                    <input type="text" class="form-control" id="transportername" placeholder="Business Name">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputName">Owner name</label>
                    <input type="text" class="form-control" id="ownername" placeholder="Full Name">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="transporteraadhar">Aadhar Card Number</label>
                    <input type="text" class="form-control" id="transporteraadhar" placeholder="Aadhar" pattern="[0-9]{12}">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="transporterpan">PAN Card Number</label>
                    <input type="text" class="form-control" id="transporterpan" placeholder="PAN" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="transportergst">GST Number</label>
                    <input type="text" class="form-control" id="transportergst" placeholder="GSTIN" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputMobile">WhatApp Mobile</label>
                    <input type="tel" class="form-control" id="whatsappmobile" placeholder="980XXXXXX" pattern="[6-9]{1}[0-9]{9}">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputEmail">Email Adress</label>
                    <input type="email" class="form-control" id="emailaddress" placeholder="Email">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="referrername">Referrer Name</label>
                    <input type="text" class="form-control" id="referrername" placeholder="Referrer Name">
                  </div>
                  <div class="form-group col-md-2">
                    <label for="referrermobile">Referrer Mobile</label>
                    <input type="tel" class="form-control" id="referrermobile" placeholder="980XXXXXX" pattern="[6-9]{1}[0-9]{9}">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="text-center">
                  <label for="visitingcard"><b>Visiting Card</b></label>
                    <div id="visitingcardcarousel" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner" id="visitingcardcarouselinner">
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
                  <input id="visitingcard" class="btn btn-primary instantview" type="file" multiple />
                  <input type="hidden" id="visitingcardid" value="" />
                  <input type="hidden" id="visitingcardstring" value="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="addtransporterwizard" class="wizard wizard-primary mb-4">
          <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            <li class="nav-item"><a class="nav-link" href="#service">Service</a></li>
            <li class="nav-item"><a class="nav-link" href="#bank">Bank</a></li>
          </ul>
          <div class="tab-content" style="overflow:visible">
            <div id="contact" class="tab-pane" role="tabpanel">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h3>Add More contacts</h3>
                  <div class="form-group">
                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="multiplename">Name of the Person</label>
                        @for ($i = 1; $i <= 5; $i++)
                        <input type="text" class="form-control" id="multiplename{{$i}}" placeholder="Name">
                        @endfor
                      </div>
                      <div class="form-group col-md-3">
                        <label for="multiplecontact">Contact Number 1</label>
                        @for ($i = 1; $i <= 5; $i++)
                        <input type="tel" class="form-control" id="multiplecontact1{{$i}}" placeholder="Mobile" pattern="[6-9]{1}[0-9]{9}">
                        @endfor
                      </div>
                      <div class="form-group col-md-3">
                        <label for="multiplecontact">Contact Number 2</label>
                        @for ($i = 1; $i <= 5; $i++)
                        <input type="tel" class="form-control" id="multiplecontact2{{$i}}" placeholder="Mobile" pattern="[6-9]{1}[0-9]{9}">
                        @endfor
                      </div>
                      <div class="form-group col-md-3">
                        <label for="multiplewhatsapp">What's App Mobile Number</label>
                        @for ($i = 1; $i <= 5; $i++)
                        <input type="tel" class="form-control" id="multiplewhatsappmobile{{$i}}" placeholder="What's App" pattern="[6-9]{1}[0-9]{9}">
                        @endfor
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div id="service" class="tab-pane" role="tabpanel">
              <div class="form-row">
                <div class="form-group col-md-1">
                  <label for="inputState">From State</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <select id="fromservicecitystate{{$i}}" class="form-control selectstate" required="required"></select>
                  @endfor
                </div>
                <div class="form-group col-md-2">
                  <label for="inputCity">From City</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <select id="fromservicecity{{$i}}" class="form-control selectcity" multiple="multiple" required></select>
                  @endfor
                </div>
                <div class="form-group col-md-1">
                  <label for="inputState">To State</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <select id="toservicecitystate{{$i}}" class="form-control selectstate" required="required" placeholder="Select State"></select>
                  @endfor
                </div>
                <div class="form-group col-md-2">
                  <label for="inputCity">To City</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <select id="toservicecity{{$i}}" class="form-control selectcity" multiple="multiple" required></select>
                  @endfor
                </div>
                <div class="form-group col-md-3">
                  <label for="trucks">Trucks</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <select id="truckselect{{$i}}" class="form-control truckselect" data-toggle="select2" multiple="multiple" style="width: 100%"></select>
                  @endfor
                </div>
                <div class="form-group col-md-3">
                  <label for="commodities">Commodity</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" id="commodities{{$i}}" class="form-control" placeholder="Commodities">
                  @endfor
                </div>
              </div>
            </div>
            <div id="bank" class="tab-pane" role="tabpanel">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="bankholdername">Account Holder Name</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" class="form-control" id="bankholdername{{$i}}" placeholder="Holder Name">
                  @endfor
                </div>
                <div class="form-group col-md-3">
                  <label for="accountnumber">Account Number</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" class="form-control" id="accountnumber{{$i}}" placeholder="Account Number">
                  @endfor
                </div>
                <div class="form-group col-md-2">
                  <label for="bankname">Bank Name</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" class="form-control" id="bankname{{$i}}" placeholder="Name">
                  @endfor
                </div>
                <div class="form-group col-md-2">
                  <label for="bankbranch">Bank's Branch</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" class="form-control" id="bankbranch{{$i}}" placeholder="Branch">
                  @endfor
                </div>
                <div class="form-group col-md-2">
                  <label for="ifsccode">IFSC Code</label>
                  @for ($i = 1; $i <= 5; $i++)
                  <input type="text" class="form-control" id="ifsccode{{$i}}" placeholder="IFSC">
                  @endfor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@stop
