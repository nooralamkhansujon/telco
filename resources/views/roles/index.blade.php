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
        .modal{
            /* width:500px; */
            /* height:auto; */
        }
    </style>
@endsection

@section('content-header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="fs-3">Role</div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-end">
                    <li class="breadcrumb-item">
                        <a href="{{ route('user.index') }}"><i class="fa fa-home"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Roles</li>
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
                    <button class="btn btn-success" data-bs-target="#modal-role" data-bs-toggle="modal">Add Role</button>
                </div>
                <!-- Start col -->
                <div class="col-md-12 bg-white py-2">
                    <table class="table" id="myTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Role</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            @foreach($roles as $role)
                            <tr>
                                <td scope="row">{{$role->id}}</td>
                                <td>{{$role->title}}</td>
                               <td>
                                <a href="#" class="btn btn-sm btn-warning edit_roles" data-role="{{$role->id}}">edit</a> ||
                                <a href="#" class="btn btn-sm btn-danger delete_roles" data-role="{{$role->id}}">delete</a>
                               </td>
                            </tr>
                            @endforeach


                        </tbody>
                      </table>

                </div>
            </div>
            <!-- /.row (main row) -->


            {{-- modal sections --}}
            <div id="modal-role" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Add Role</h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOptadd" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id">
                                <div  class="form-group">
                                    <label class="control-label col-md-3">Role</label>
                                    <div class="col-md-9">
                                        <input type="text" id="role" class="form-control" name="role" >
                                    </div>
                                </div>


                                <div id="role-wrap" class="row">
                                    <div class="col-md-12">
                                        <label class="control-label col-md-3">Permission</label>
                                    </div>
                                    @foreach($permissions as $permission)
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input mr-1" name="permissions[]" type="checkbox"   value="{{$permission->id}}" id="{{$permission->id}}" />
                                            <label class="form-check-label" for="{{$permission->id}}"> {{$permission->title}}</label>
                                          </div>

                                    </div>
                                    @endforeach
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
            <div id="edit-role-modal" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Edit Role</h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOpt" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id" id="role_id">

                                <div  class="form-group">
                                    <label class="control-label col-md-3">Role</label>
                                    <div class="col-md-9">
                                        <input type="text" id="edit_role" class="form-control" name="role" >
                                    </div>
                                </div>
                                <div id="role-wrap" >
                                    <div class="col-md-12">
                                        <label class="control-label col-md-3">Permission</label>
                                    </div>
                                    @foreach($permissions as $permission)
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input mr-1" name="permissions[]" type="checkbox"   value="{{$permission->id}}" id="{{$permission->id}}" />
                                            <label class="form-check-label" for="{{$permission->id}}"> {{$permission->title}}</label>
                                          </div>

                                    </div>
                                    @endforeach
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
        const edit_roles_buttons = document.querySelectorAll('.edit_roles');
        console.log(edit_roles_buttons);
        edit_roles_buttons.forEach(edit_role_button=>{
            edit_role_button.addEventListener('click',function(e){
                    const role = e.target.dataset.role;
                    axios.get(`/role/${role}`)
                        .then(response=>{
                            console.log(response)
                            const {data:{role}} = response;
                            $("#edit_role").val(role.title)
                            $("#role_id").val(role.id)
                            $("#edit-role-modal").modal('show');

                        }).catch(error=>{
                          console.log(error)
                        })
                })
        })


        const delete_roles_buttons = document.querySelectorAll('.delete_roles');
        console.log(delete_roles_buttons);
        delete_roles_buttons.forEach(delete_role_button=>{

            delete_role_button.addEventListener('click',function(e){
                if(!confirm('Are you Sure ! you wan\'t to delete')){
                    return
                }
                    const role = e.target.dataset.role;
                    axios.delete(`/role/${role}`)
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
            const roleId  = document.querySelector('#role_id').value
            axios.post(`/role/update/${roleId}`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#edit-role-modal").modal('hide');
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
            const roleId  = document.querySelector('#role_id').value
            axios.post(`/role`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#modal-role").modal('hide');
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

