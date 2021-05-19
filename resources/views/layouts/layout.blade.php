@include('layouts.header')
<body data-theme="light" data-layout="fluid" data-sidebar-position="left" data-sidebar-behavior="compact">
	<div class="wrapper">
    @include('layouts.sidebar')
		<div class="main">
			<nav class="navbar navbar-expand navbar-light navbar-bg">
				<a class="sidebar-toggle">
          <i class="hamburger align-self-center"></i>
        </a>
				<form class="d-none d-sm-inline-block">
					<div class="input-group input-group-navbar">
						<input type="text" class="form-control" placeholder="Search projects…" aria-label="Search">
						<div class="input-group-append">
							<button class="btn" type="button">
                <i class="align-middle" data-feather="search"></i>
              </button>
						</div>
					</div>
				</form>
				<div class="navbar-collapse collapse">
					<ul class="navbar-nav navbar-align">
            <li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-toggle="dropdown" aria-expanded="false">
								<div class="position-relative">
                  <span class="iconify" data-icon="feather-bell" data-inline="false"></span>
								</div>
							</a>
							<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="alertsDropdown">
								<div class="dropdown-menu-header">
									1 New Notifications
								</div>
								<div class="list-group">
									<a href="#" class="list-group-item">
										<div class="row no-gutters align-items-center">
											<div class="col-2">
                        <span class="iconify" data-icon="clarity:success-standard-line" data-inline="false" style="color: green;"></span>
											</div>
											<div class="col-10">
												<div class="text-dark">Update completed</div>
												<div class="text-muted small mt-1">Restart server 12 to complete the update.</div>
												<div class="text-muted small mt-1">2h ago</div>
											</div>
										</div>
									</a>
								</div>
								<div class="dropdown-menu-footer">
									<a href="#" class="text-muted">Show all notifications</a>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle d-none d-sm-inline-block" data-toggle="dropdown">
                <span class="text-dark">Administrator</span>
              </a>
							<div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">
                  <i class="align-middle mr-1" data-feather="user"></i>
                  Profile
                </a>
                <a class="dropdown-item" href="#">
                  <i class="align-middle mr-1" data-feather="pie-chart"></i>
                  Analytics
                </a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#">Settings & Privacy</a>
								<a class="dropdown-item" href="#">Help</a>
								<a id="logout" class="dropdown-item">Sign out</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
      <main class="content">
        @yield('content')
      </main>
      @include('layouts.footer')
    </div>
  </div>
</body>
</html>
