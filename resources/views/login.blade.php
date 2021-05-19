<!DOCTYPE html>
<html lang="en">
@include('layouts.header')
<body data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-behavior="sticky">
	<div class="main d-flex justify-content-center w-100">
		<main class="content d-flex p-0">
			<div class="container d-flex flex-column">
				<div class="row h-100">
					<div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
						<div class="d-table-cell align-middle">
							<div class="text-center mt-4">
								<h1 class="h2">Welcome back, Administrator</h1>
								<p class="lead">
									Sign in to your account to continue
								</p>
							</div>
							<div class="card">
								<div class="card-body">
									<div class="m-sm-4">
                    <div class="form-group">
                      <label>Email</label>
                      <input class="form-control form-control-lg" type="email" name="email" id="loginemail" placeholder="Enter your email" />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input class="form-control form-control-lg" type="password" name="password" id="loginpassword" placeholder="Enter your password" />
                      <small><a href="pages-reset-password.html">Forgot password?</a></small>
                    </div>
                    <div class="text-center mt-3">
                      <button id="login" type="submit" class="btn btn-lg btn-primary">Sign in</button>
                    </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</body>
</html>
