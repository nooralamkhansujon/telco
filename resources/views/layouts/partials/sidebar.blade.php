   <!-- Main Sidebar Container -->
   <aside class="main-sidebar sidebar-bg-dark sidebar-color-primary shadow">
       <div class="brand-container">
           <a href="javascript:;" class="brand-link">
               <img src="{{ asset('assets/img/AdminLTELogo.png') }}" alt="AdminLTE Logo"
                   class="brand-image opacity-80 shadow">
               <span class="brand-text fw-light">| Telco</span>
           </a>
           <a class="pushmenu mx-1" data-lte-toggle="sidebar-mini" href="javascript:;" role="button"><i
                   class="fas fa-angle-double-left"></i></a>
       </div>
       <!-- Sidebar -->
       <div class="sidebar">
           <nav class="mt-2">
               <!-- Sidebar Menu -->
               <ul class="nav nav-pills nav-sidebar flex-column" data-lte-toggle="treeview" role="menu"
                   data-accordion="false">
                   <li class="nav-item">
                       <a href="{{ route('user.index') }}"
                           class="nav-link {{ url()->current() . '/' == asset('/') ? 'active' : '' }}">
                           <i class="nav-icon fas fa-home"></i>
                           <p>
                               Home
                           </p>
                       </a>
                   </li>



                   <li class="nav-item ">
                       <a href="javascript:;" class="nav-link ">
                           <i class="fa fa-gear"></i>
                           <p>
                               User
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">
                           <li class="nav-item">
                               <a href="#" class="nav-link ">
                                   <i class="fa fa-book"></i>
                                   <p>users</p>
                               </a>
                           </li>
                           <li class="nav-item">
                               <a href="#" class="nav-link ">
                                   <i class="fa fa-envelope"></i>
                                   <p>Email</p>
                               </a>
                           </li>
                       </ul>
                   </li>
                   <li class="nav-item ">
                    <a href="javascript:;" class="nav-link ">
                        <i class="fa fa-gear"></i>
                        <p>
                            outlets
                            <i class="end fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{route('outlet.index')}}" class="nav-link ">
                                <i class="fa fa-book"></i>
                                <p>Outlets List</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{route('outlet_activities.index')}}" class="nav-link ">
                                <i class="fa fa-book"></i>
                                <p>Outlets Activities</p>
                            </a>
                        </li>
                    </ul>
                </li>

                   <li class="nav-item ">
                       <a href="javascript:;" class="nav-link ">
                           <i class="fa fa-gear"></i>
                           <p>
                              Authorization
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">
                           <li class="nav-item">
                               <a href="{{route('role.index')}}" class="nav-link ">
                                   <i class="fa fa-book"></i>
                                   <p>Roles List</p>
                               </a>
                           </li>
                           <li class="nav-item">
                               <a href="#" class="nav-link ">
                                   <i class="fa fa-envelope"></i>
                                   <p>Permissions</p>
                               </a>
                           </li>
                       </ul>
                   </li>
               </ul>
           </nav>
       </div>
       <!-- /.sidebar -->
   </aside>
