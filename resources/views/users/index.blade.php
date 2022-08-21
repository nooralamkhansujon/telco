@extends('layouts.master')
@section('css')
    {{-- <link rel="stylesheet" href="{{ asset('css/hummingbird-treeview.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('css/hua.css') }}" />
    {{-- <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}" /> --}}
    <link rel="stylesheet" href="{{ asset('css/zTreeStyle/zTreeStyle.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/toastr.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/bootstrap-table.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/_all-skins.min.css') }}" />
    {{-- <link rel="stylesheet" href="{{ asset('css/bootstrap-select.min.css') }}" /> --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"
        integrity="sha512-nMNlpuaDPrqlEls3IX/Q56H36qvBASwb3ipuo3MxeWbsQB1881ox0cRv7UPTgBlriqoynt35KjEwgGUeUXIPnw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />

    {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" /> --}}

    {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js"></script> --}}

    <style>
        #formOpt-roleIds {
            width: 250px !important;
        }
    </style>
@endsection

@section('content-header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="fs-3">Accounts</div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-end">
                    <li class="breadcrumb-item">
                        <a href="{{ route('user.index') }}"><i class="fa fa-home"></i></a>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="#">Organization</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Account</li>
                </ol>
            </div>
        </div>
    </div>
@endsection



@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row  pt-2">
                <div class="col-md-12 my-3 ">
                    <button class="btn btn-success" data-bs-target="#modal-user" data-bs-toggle="modal">Add User</button>
                </div>
                <!-- Start col -->
                <div class="col-md-12 bg-white py-2">
                    <table class="table" id="myTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            @foreach($users as $user)
                            <tr>
                                <td scope="row">{{$user->id}}</td>
                                <td>{{$user->name}}</td>
                                <td>{{$user->email}}</td>
                                <td>{{$user->roles->count()?$user->roles->first()->title:''}}</td>
                               <td>
                                <a href="#" class="btn btn-sm btn-warning edit_users" data-user="{{$user->id}}">edit</a> ||
                                <a href="#" class="btn btn-sm btn-danger delete_users" data-user="{{$user->id}}">delete</a>
                               </td>
                            </tr>
                            @endforeach


                        </tbody>
                      </table>

                </div>
            </div>
            <!-- /.row (main row) -->


            {{-- modal sections --}}
            <div id="modal-user" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Add User</h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOptadd" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id">
                                <div  class="form-group">
                                    <label class="control-label col-md-3">Name</label>
                                    <div class="col-md-9">
                                        <input type="text" id="name" class="form-control" name="name" >
                                    </div>
                                </div>
                                <div id="user-wrap" class="form-group">
                                    <label class="control-label col-md-3">Email</label>
                                    <div class="col-md-9">
                                        <input id="email" class="form-control" name="email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">Password</label>
                                    <div class="col-md-9">
                                        <input type='password' class="form-control" name="password">
                                    </div>
                                </div>

                                <div id="role-wrap" class="form-group">
                                    <label class="control-label col-md-3">Role</label>
                                    <div class="col-md-9">
                                        <select id="formOpt-roleIds" name="roleIds[]" class="form-control" >
                                            @foreach($roles as $role)
                                              <option value="{{$role->id}}">
                                                {{$role->title}}
                                               </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="btn-save" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="edit-user-modal" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Edit User</h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOpt" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id" id="user_id">

                                <div  class="form-group">
                                    <label class="control-label col-md-3">Name</label>
                                    <div class="col-md-9">
                                        <input type="text" id="edit_name" class="form-control" name="name" >
                                    </div>
                                </div>
                                <div id="user-wrap" class="form-group">
                                    <label class="control-label col-md-3">Email</label>
                                    <div class="col-md-9">
                                        <input id="edit_email" class="form-control" name="email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">Password</label>
                                    <div class="col-md-9">
                                        <input type='password' class="form-control" id="edit_password" name="password" autocomplete="off">
                                    </div>
                                </div>

                                <div id="role-wrap" class="form-group">
                                    <label class="control-label col-md-3">Role</label>
                                    <div class="col-md-9">
                                        <select id="roleIds" name="roleIds" class="form-control" >
                                            @foreach($roles as $role)
                                              <option value="{{$role->id}}">
                                                {{$role->title}}
                                               </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button id="btn-update" type="button" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {{-- end of modal sections --}}
        </div><!-- /.container-fluid -->
    </div>
@endsection

@push('js')
<script>
    $(document).ready( function () {
       $('#myTable').DataTable();
    });

    $(document).ready(function(){
        const edit_users_buttons = document.querySelectorAll('.edit_users');
        console.log(edit_users_buttons);
        edit_users_buttons.forEach(edit_user_button=>{
            edit_user_button.addEventListener('click',function(e){
                    const user = e.target.dataset.user;
                    axios.get(`/user/${user}`)
                        .then(response=>{
                            console.log(response)
                            const {data:{user}} = response;
                            $("#edit_name").val(user.name)
                            $("#edit_email").val(user.email)
                            $("#user_id").val(user.id)
                            $("#edit-user-modal").modal('show');

                        }).catch(error=>{
                          console.log(error)
                        })
                })
        })


        const delete_users_buttons = document.querySelectorAll('.delete_users');
        console.log(delete_users_buttons);
        delete_users_buttons.forEach(delete_user_button=>{

            delete_user_button.addEventListener('click',function(e){
                if(!confirm('Are Sure you wan\'t delete')){
                    return
                }
                    const user = e.target.dataset.user;
                    axios.delete(`/user/${user}`)
                        .then(response=>{
                            console.log(response)
                            Swal.fire(
                                'Success?',
                                response?.data?.message ,
                                'question'
                            )
                            location.reload();
                        }).catch(error=>{
                            console.log(error)
                        })
                })
        })

        const btnUpdate = document.querySelector('#btn-update');
        btnUpdate.addEventListener('click',function(e){
            const formData = new FormData(document.querySelector('#formOpt'));
            const userId  = document.querySelector('#user_id').value
            axios.post(`/user/update/${userId}`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#edit-user-modal").modal('hide');
                    Swal.fire(
                        'Success?',
                        response?.data?.success ,
                        'question'
                    )
                    location.reload();
                 })
                 .catch(error=>{
                    console.log(error)
                 })

        })


        // for add

        const btnAdd = document.querySelector('#btn-save');
        btnAdd.addEventListener('click',function(e){
            const formData = new FormData(document.querySelector('#formOptadd'));
            const userId  = document.querySelector('#user_id').value
            axios.post(`/user`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#modal-user").modal('hide');
                    Swal.fire(
                        'Success?',
                        response?.data?.success ,
                        'question'
                    )
                    location.reload();
                 })
                 .catch(error=>{
                    console.log(error)
                 })

        })

    });
</script>

@endpush

