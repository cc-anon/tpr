@extends('layouts.layout')
@section('content')
<div class="container-fluid p-0">
  <h1 class="h3 mb-3">All Trucks</h1>
  <div class="row">
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
    <div class="col-xl-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Trucks</h5>
        </div>
        <div class="card-body">
          <table id="datatablestransporters" class="table table-striped truck" style="width:100%">
            <thead>
              <tr>
                <th>Transporter Name</th>
                <th>Owner Name</th>
                <th>Contact Number</th>
                <th>State(City)</th>
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
