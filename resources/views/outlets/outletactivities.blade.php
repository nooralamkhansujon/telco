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

@endsection

@section('content-header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="fs-3">Outlet Activities</div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-end">
                    <li class="breadcrumb-item">
                        <a href="{{ route('user.index') }}"><i class="fa fa-home"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Outlet Activities</li>
                </ol>
            </div>
        </div>
    </div>
@endsection



@section('content')
    <div class="content">
        <div class="container-fluid">

            <form class="row">
                <div class="col-md-4">
                   <div class="form-group">
                       <input type="text" class="form-control" name="daterange" id="daterange">
                   </div>
                </div>
                <div class="col-md-4">
                   <div class="form-group">
                      <select name="outlet_id" class="form-control" id="outlet_id">
                        <option disabled>select outlet</option>
                        @foreach($outlets as $outlet)
                          <option value="{{$outlet->id}}">{{$outlet->name}}</option>
                        @endforeach
                      </select>
                   </div>
                </div>
                <div class="col-md-4">
                   <div class="form-group">
                      <button type="submit" class="btn btn-success">filter</button>
                   </div>
                </div>
            </form>
            <div class="row  pt-2">

                <div class="col-md-12 bg-white py-2">
                    <table class="table" id="myTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Outlet</th>
                            <th>Visit Date</th>
                          </tr>
                        </thead>
                        <tbody>
                            @foreach($outlet_activities as $activity)
                            <tr>
                                <td scope="row">{{$activity->id}}</td>
                                <td>{{$activity->outlet->name}}</td>
                                <td>{{$activity->visit_date}}</td>
                            </tr>
                            @endforeach


                        </tbody>
                      </table>

                </div>
            </div>
            <!-- /.row (main row) -->



        </div><!-- /.container-fluid -->
    </div>
@endsection

@push('js')
<script>
    $(document).ready( function () {
       $('#myTable').DataTable();
       $('#daterange').daterangepicker({
            timePicker: true,
            startDate: "{{$from}}",
            endDate: "{{$to}}",
            locale: {
            format: 'Y-M-DD'
            }
       });
    });




    // dark.addTo(map)
</script>

@endpush

