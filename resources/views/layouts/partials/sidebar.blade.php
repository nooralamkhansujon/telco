   <!-- Main Sidebar Container -->
   <aside class="main-sidebar sidebar-bg-dark sidebar-color-primary shadow">
       <div class="brand-container">
           <a href="javascript:;" class="brand-link">
               <img src="{{ asset('assets/img/AdminLTELogo.png') }}" alt="AdminLTE Logo"
                   class="brand-image opacity-80 shadow">
               <span class="brand-text fw-light">| Patrol</span>
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
                       <a href="{{ route('home') }}"
                           class="nav-link {{ url()->current() . '/' == asset('/') ? 'active' : '' }}">
                           <i class="nav-icon fas fa-home"></i>
                           <p>
                               Home
                           </p>
                       </a>
                   </li>
                   @php
                       $organization_routes = [asset('/roles'), asset('/accounts'), asset('/patrolman'), asset('/organizations')];
                   @endphp
                   <li class="nav-item {{ in_array(url()->current(), $organization_routes) ? 'menu-open' : '' }}">
                       <a href="javascript:;"
                           class="nav-link  {{ in_array(url()->current(), $organization_routes) ? 'active' : '' }}">
                           <i class="nav-icon fas fa-users"></i>
                           <p>
                               Organization
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">

                           @can('viewAny', App\Models\Role::class)
                               <li class="nav-item">
                                   <a href="{{ route('roles.index') }}"
                                       class="nav-link  {{ url()->current() == asset('/roles') ? 'active' : '' }}">
                                       <i class="fa fa-unlock"></i>
                                       <p>Role Management</p>
                                   </a>
                               </li>
                           @endcan

                           @can('viewAny', App\Models\User::class)
                               <li class="nav-item">
                                   <a href="{{ route('accounts.index') }}"
                                       class="nav-link  {{ url()->current() == asset('/accounts') ? 'active' : '' }}">
                                       <i class="fa fa-user"></i>
                                       <p>Accounts </p>
                                   </a>
                               </li>
                           @endcan
                           @can('viewAny', App\Models\PatrolMan::class)
                               <li class="nav-item">
                                   <a href="{{ route('patrolman.index') }}"
                                       class="nav-link  {{ url()->current() == asset('/patrolman') ? 'active' : '' }}">
                                       <i class="fa fa-user"></i>
                                       <p>Patrolman</p>
                                   </a>
                               </li>
                           @endcan
                           @can('viewAny', App\Models\Organization::class)
                               <li class="nav-item">
                                   <a href="{{ route('organizations.index') }}"
                                       class="nav-link  {{ url()->current() == asset('/organizations') ? 'active' : '' }} ">
                                       <i class="fa fa-institution"></i>
                                       <p>Organization</p>
                                   </a>
                               </li>
                           @endcan
                       </ul>
                   </li>
                   @php
                       $patrolmanagement_routes = [asset('/checkpoint'), asset('/routes'), asset('/patrol_task'), asset('/device')];
                   @endphp
                   <li
                       class="nav-item  {{ in_array(url()->current(), $patrolmanagement_routes) ? 'menu-open' : '' }}">
                       <a href="javascript:;"
                           class="nav-link  {{ in_array(url()->current(), $patrolmanagement_routes) ? 'active' : '' }}">
                           <i class="fa fa-asl-interpreting "></i>
                           <p>
                               Patrol Management
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">
                           @can('viewAny', App\Models\CheckPoint::class)
                               <li class="nav-item">
                                   <a href="{{ route('checkpoint.index') }}"
                                       class="nav-link {{ url()->current() == asset('/checkpoint') ? 'active' : '' }} ">
                                       <i class="fa fa-podcast"></i>
                                       <p>Checkpoint</p>
                                   </a>
                               </li>
                           @endcan
                           @can('viewAny', App\Models\Route::class)
                               <li class="nav-item">
                                   <a href="{{ route('routes.index') }}"
                                       class="nav-link {{ url()->current() == asset('/routes') ? 'active' : '' }}">
                                       <i class="fa fa-road"></i>
                                       <p>Route</p>
                                   </a>
                               </li>
                           @endcan
                           @can('viewAny', App\Models\PatrolTask::class)
                               <li class="nav-item">
                                   <a href="{{ route('patrol_task.index') }}"
                                       class="nav-link {{ url()->current() == asset('/patrol_task') ? 'active' : '' }} ">
                                       <i class="fa fa-shopping-basket"></i>
                                       <p>Patrol Task</p>
                                   </a>
                               </li>
                           @endcan
                           <li class="nav-item">
                               <a href="{{ route('device.index') }}"
                                   class="nav-link  {{ url()->current() == asset('/device') ? 'active' : '' }}">
                                   <i class="fa fa-microchip"></i>
                                   <p>Device</p>
                               </a>
                           </li>
                       </ul>
                   </li>
                   @php
                       $check_records_routes = [asset('/checkpointLogs')];
                   @endphp
                   <li class="nav-item  {{ in_array(url()->current(), $check_records_routes) ? 'menu-open' : '' }}">
                       <a href="javascript:;"
                           class="nav-link  {{ in_array(url()->current(), $check_records_routes) ? 'active' : '' }}">
                           <i class="fa fa-bar-chart"></i>
                           <p>
                               Check Records
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">
                           @can('viewAny', App\Models\CheckpointLog::class)
                               <li class="nav-item">
                                   <a href="{{ route('checkpointLogs.index') }}"
                                       class="nav-link  {{ url()->current() == asset('/checkpointLogs') ? 'active' : '' }}">
                                       <i class="fa fa-line-chart"></i>
                                       <p>Attendence</p>
                                   </a>
                               </li>
                           @endcan
                           <li class="nav-item">
                               <a href="#" class="nav-link ">
                                   <i class="fa fa-tasks"></i>
                                   <p>Task</p>
                               </a>
                           </li>
                           <li class="nav-item">
                               <a href="" class="nav-link ">
                                   <i class="fa fa-bars"></i>
                                   <p>Task Details</p>
                               </a>
                           </li>
                       </ul>
                   </li>
                   <li class="nav-item ">
                       <a href="javascript:;" class="nav-link ">
                           <i class="fa fa-gear"></i>
                           <p>
                               System
                               <i class="end fas fa-angle-left"></i>
                           </p>
                       </a>
                       <ul class="nav nav-treeview">
                           <li class="nav-item">
                               <a href="#" class="nav-link ">
                                   <i class="fa fa-book"></i>
                                   <p>Operation log</p>
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
               </ul>
           </nav>
       </div>
       <!-- /.sidebar -->
   </aside>
