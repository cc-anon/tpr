@extends('layouts.layout')
@section('content')
<div class="container-fluid p-0">
  <div class="row mb-2 mb-xl-3">
  	<div class="col-auto d-none d-sm-block">
  		<h3>Dashboard</h3>
  	</div>
  </div>
</div>
<div class="row">
	<div class="col-12 col-sm-6 col-xxl d-flex">
		<div class="card illustration flex-fill">
			<div class="card-body p-0 d-flex flex-fill">
				<div class="row no-gutters w-100">
					<div class="col-6">
						<div class="illustration-text p-3 m-1">
							<h4 class="illustration-text">Welcome Back, Administrator!</h4>
							<p class="mb-0">Trasporter Admin Dashboard</p>
						</div>
					</div>
					<div class="col-6 align-self-end text-right">
						<img src="/img/support.png" alt="Customer Support" class="img-fluid illustration-img">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-12 col-sm-6 col-xxl d-flex">
    <div class="card flex-fill">
  	  <div class="card-body py-4">
  		  <div class="media">
  			  <div class="media-body">
  				  <h3 class="mb-2">1143</h3>
  				  <p class="mb-2">Trasporter Entries</p>
  			  </div>
  			  <div class="d-inline-block ml-3">
  				  <div class="stat">
  					  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag align-middle text-danger"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  				  </div>
  			  </div>
  		  </div>
  	  </div>
    </div>
  </div>
</div>

<div id="mystate"></div>
@stop
