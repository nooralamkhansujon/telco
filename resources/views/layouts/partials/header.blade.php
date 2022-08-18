  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-light">
      <div class="container-fluid">
          <!-- Start navbar links -->
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link" data-lte-toggle="sidebar-full" href="#" role="button"><i
                          class="fas fa-bars"></i></a>
              </li>
          </ul>

          <!-- End navbar links -->
          <ul class="navbar-nav ms-auto">
              <!-- Notifications Dropdown Menu -->
              <li class="nav-item dropdown">
                  <a class="nav-link" data-bs-toggle="dropdown" href="#">
                      <i class="far fa-bell"></i>
                      <span class="badge bg-warning navbar-badge">15</span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                      <span class="dropdown-item dropdown-header">15 Notifications</span>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-envelope me-2"></i> 4 new messages
                          <span class="float-end text-muted fs-7">3 mins</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-users me-2"></i> 8 friend requests
                          <span class="float-end text-muted fs-7">12 hours</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-file me-2"></i> 3 new reports
                          <span class="float-end text-muted fs-7">2 days</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                  </div>
              </li>
              <li class="nav-item dropdown user-menu">
                  <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                      <img src="{{ asset('assets/img/user2-160x160.jpg') }}" class="user-image img-circle shadow"
                          alt="User Image">
                      <span class="d-none d-md-inline">{{ auth()->user()->name }}</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                      <!-- User image -->
                      <li class="user-header bg-primary">
                          <img src="{{ asset('assets/img/user2-160x160.jpg') }}" class="img-circle shadow"
                              alt="User Image">
                          <p>
                              Alexander Pierce - Web Developer
                              <small>Member since Nov. 2012</small>
                          </p>
                      </li>
                      <!-- Menu Body -->
                      <li class="user-body">
                          <div class="row">
                              <div class="col-4 text-center">
                                  <a href="#">Followers</a>
                              </div>
                              <div class="col-4 text-center">
                                  <a href="#">Sales</a>
                              </div>
                              <div class="col-4 text-center">
                                  <a href="#">Friends</a>
                              </div>
                          </div>
                          <!-- /.row -->
                      </li>
                      <!-- Menu Footer-->
                      <li class="user-footer">
                          <a href="#" class="btn btn-default btn-flat">Profile</a>
                          <form action="{{ route('logout') }}" method="post">
                              @csrf
                              <button href="#" type="submit" class="btn btn-default btn-flat float-end" id="logout">Sign
                                  out</button>
                          </form>
                      </li>
                  </ul>
              </li>
              <!-- TODO tackel in v4.1 -->
          </ul>
      </div>
  </nav>
  <!-- /.navbar -->
