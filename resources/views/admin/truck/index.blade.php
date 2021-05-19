@extends('layouts.layout')
@section('content')
<div class="container-fluid p-0">
  <h1 class="h3 mb-3">All Trucks</h1>
  <div class="row">
    <div id="truckentirecard" class="d-none col-xl-4">
      <input id="truckid" type="hidden" value="">
      <div class="card">
        <div class="card-header">
          <div class="card-actions float-right">
            <div class="dropdown show">
              <a href="#" data-toggle="dropdown" data-display="static">
                <i class="align-middle" data-feather="more-horizontal"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a href="#truckcollapse" class="dropdown-item" data-toggle="collapse">Edit</a>
                <a href="#deletetruckmodal" class="dropdown-item" data-toggle="modal" data-traget="#deletetruckmodal">Delete</a>
              </div>
            </div>
          </div>
          <h5 id="trucktypestyle" class="card-title mb-0"></h5>
        </div>
        <div class="card-body">
          <table id="truckviewcard" class="table table-sm my-2">
            <tbody>
            </tbody>
          </table>
          <hr />
          <strong>Available with the transporters</strong>
          <ul id="availabletransporters" class="timeline mt-2 mb-0">
          </ul>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deletetruckmodal" tabindex="-1" role="dialog" aria-hidden="true">
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
              <p><strong>Are you sure you want to delete this Truck Type?</strong></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button id="deletetruckconfirm" type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-8">
      <div class="collapse card" id="truckcollapse">
        <div class="card-header">
          <div class="float-right">
            <button type="button" class="close" data-toggle="collapse" href="#truckcollapse" aria-lable="Close"><span aria-hidden="true">×</span></button>
          </div>
          <h5 class="card-title mb-0">Edit Truck</h5>
        </div>
        <div class="card-body">
            <div class="form-row">
              <input type="hidden" value="-1">
              <div class="form-group col-md-3">
                <label for="trucktype">Truck Type</label>
                <input type="text" class="form-control" id="trucktype" placeholder="Type">
              </div>
              <div class="form-group col-md-3">
                <label for="truckstyle">Truck Style</label>
                <input type="text" class="form-control" id="truckstyle" placeholder="Style">
              </div>
              <div class="form-group col-md-2">
                <label for="truckcategory">Truck Category</label>
                <input type="text" class="form-control" id="truckcategory" placeholder="Category">
              </div>
              <div class="form-group col-md-2">
                <label for="trucksize">Truck Size</label>
                <input type="text" class="form-control" id="trucksize" placeholder="Feet">
              </div>
              <div class="form-group col-md-2">
                <label for="truckcapacity">Truck Capacity</label>
                <input type="text" class="form-control" id="truckcapacity" placeholder="Ton">
              </div>
            </div>
            <div class="modal fade" id="truckmodal" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Please make following changes</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body m-3">
                    <div id="truckmodalcontent" class="mb-0">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          <button id="edittrucktodatabase" class="btn btn-primary">Submit</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Trucks</h5>
        </div>
        <div class="card-body">
          <table id="datatablestrucks" class="table table-striped truck" style="width:100%">
            <thead>
              <tr>
                <th>Type</th>
                <th>Style</th>
                <th>Category</th>
                <th>Size (Feet)</th>
                <th>Capacity (Ton)</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
@stop
