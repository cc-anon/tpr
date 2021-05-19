<div class="card-body">
  <div id="branchdetails1" class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">1. Branch Details</h5>
    </div>
    <div class="card-body">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="branchname">Branch Name</label>
          <input type="text" class="form-control" id="branchname1" placeholder="Name">
        </div>
        <div class="form-group col-md-6">
          <label for="branchhandlername">Branch Handler Name</label>
          <input type="text" class="form-control" id="branchhandlername1" placeholder="Handler Name">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="branchemailaddress">Email Adress</label>
          <input type="email" class="form-control" id="branchemailaddress1" placeholder="Email">
        </div>
        <div class="form-group col-md-4">
          <label for="branchwhatsappmobile">What's App Mobile Number</label>
          <input type="tel" class="form-control" id="branchwhatsappmobile1" placeholder="980XXXXXX" pattern="[6-9]{1}[0-9]{9}">
        </div>
        <div class="form-group col-md-4">
          <label for="branchmobile">Contact Number</label>
          <input type="tel" class="form-control" id="branchmobile1" placeholder="980XXXXXX" pattern="[6-9]{1}[0-9]{9}">
        </div>
      </div>
      <div class="form-group">
        <label for="branchaddress">Address</label>
        <input type="text" class="form-control" id="branchaddress1" placeholder="1234 Main St">
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="branchstate">State</label>
          <select onchange="print_city('branchcity1', this.selectedIndex);" id="branchstate1" class="form-control" required></select>
        </div>
        <div class="form-group col-md-4">
          <label for="branchcity">City</label>
          <select id="branchcity1" class="form-control"></select>
        </div>
        <script language="javascript">print_state("branchstate1");</script>
        <div class="form-group col-md-2">
          <label for="brancharea">Area</label>
          <input type="text" class="form-control" id="brancharea1">
        </div>
        <div class="form-group col-md-2">
          <label for="branchzip">Zip</label>
          <input type="text" class="form-control" id="branchzipcode1" pattern="[0-9]{6}">
        </div>
      </div>
    </div>
  </div>
  <button id="addbranch" class="btn btn-primary"><i class="fas fa-plus"></i> Add More</button>
</div>
