@extends('layouts.layout')
@section('content')
<div class="container-fluid p-0">
<h1 class="h3 mb-3">Transporter</h1>
<div class="row">
  <div class="col-md-4 col-xl-3">
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
        <div id="viewownername" class="text-muted mb-2"></div>
        <div id="viewtype" class="text-muted mb-2"></div>
        <div>
          <a class="btn btn-primary btn-sm" href="#"><span data-feather="message-square"></span> Message</a>
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">Contact</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1">What's App Number <a href="#" id="viewwhatsappnumber"></a></li>
          <li class="mb-1">Email Address <a href="#" id="viewemailaddress"></a></li>
        </ul>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">Address</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1"><a href="#" id="viewaddress"></a></li>
        </ul>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">Commodity</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1"><a href="#" id="viewcommodity"></a></li>
        </ul>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">Referrer</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1">Referrer Name <a href="#" id="viewreferrername"></a></li>
          <li class="mb-1">Referrer Mobile <a href="#" id="viewreferrermobile"></a></li>
        </ul>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <h5 class="h6 card-title">References</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-1"><span class="fas fa-globe fa-fw mr-1"></span> <a href="#">staciehall.co</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-8 col-xl-9">
    <div class="accordion" id="transporteraccordion">
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="card-title my-2">
            <a href="#" data-toggle="collapse" data-target="#viewmorecontacts" aria-expanded="true" aria-controls="viewmorecontacts">More Contacts</a>
          </h5>
        </div>
        <div id="viewmorecontacts" class="collapse" aria-labelledby="viewmorecontacts" data-parent="#transporteraccordion">

          <div class="card-body">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
@stop
