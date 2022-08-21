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
        #map {
            width: 100%;
            height: 600px;
        }

        .coordinate {
            position: absolute;
            bottom: 10px;
            right: 50%;
        }

        .leaflet-popup-content-wrapper {
            background-color: #000000;
            color: #fff;
            border: 1px solid red;
            border-radius: 0px;
        }
    </style>
@endsection

@section('content-header')
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="fs-3">Outlet</div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-end">
                    <li class="breadcrumb-item">
                        <a href="{{ route('user.index') }}"><i class="fa fa-home"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Outlet</li>
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
                    <button class="btn btn-success" data-bs-target="#modal-outlet" data-bs-toggle="modal">Add Outlet</button>
                </div>
                <!-- Start col -->
                <div class="col-md-12">
                    <div id="map">
                        <div class="leaflet-control coordinate"></div>
                    </div>
                </div>
                <div class="col-md-12 bg-white py-2">
                    <table class="table" id="myTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            @foreach($outlets as $outlet)
                            <tr>
                                <td scope="row">{{$outlet->id}}</td>
                                <td>{{$outlet->name}}</td>
                                <td>{{$outlet->latitude}}</td>
                                <td>{{$outlet->longitude}}</td>
                               <td>
                                <a href="#" class="btn btn-sm btn-warning edit_outlets" data-outlet="{{$outlet->id}}">edit</a> ||
                                <a href="#" class="btn btn-sm btn-danger delete_outlets" data-outlet="{{$outlet->id}}">delete</a>
                               </td>
                            </tr>
                            @endforeach


                        </tbody>
                      </table>

                </div>
            </div>
            <!-- /.row (main row) -->


            {{-- modal sections --}}
            <div id="modal-outlet" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Add Outlet</h4>
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
                                    <label class="control-label col-md-3">Latitude</label>
                                    <div class="col-md-9">
                                        <input id="latitude" class="form-control" name="latitude">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">Longitude</label>
                                    <div class="col-md-9">
                                        <input type='text' class="form-control" name="longitude">
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
            <div id="edit-outlet-modal" class="modal fade" role="dialog" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Edit Outlet</h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOpt" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id" id="outlet_id">

                                <div  class="form-group">
                                    <label class="control-label col-md-3">Name</label>
                                    <div class="col-md-9">
                                        <input type="text" id="edit_name" class="form-control" name="name" >
                                    </div>
                                </div>
                                <div id="user-wrap" class="form-group">
                                    <label class="control-label col-md-3">Longitude</label>
                                    <div class="col-md-9">
                                        <input type="text" id="edit_longitude" class="form-control" name="longitude">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">Latitude</label>
                                    <div class="col-md-9">
                                        <input type='text' class="form-control" id="edit_latitude" name="latitude" autocomplete="off">
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
        const edit_outlets_buttons = document.querySelectorAll('.edit_outlets');
        console.log(edit_outlets_buttons);
        edit_outlets_buttons.forEach(edit_outlet_button=>{
            edit_outlet_button.addEventListener('click',function(e){
                    const outlet = e.target.dataset.outlet;
                    axios.get(`/outlet/${outlet}`)
                        .then(response=>{
                            console.log(response)
                            const {data:{outlet}} = response;
                            $("#edit_name").val(outlet.name)
                            $("#edit_latitude").val(outlet.latitude)
                            $("#edit_longitude").val(outlet.longitude)
                            $("#outlet_id").val(outlet.id)
                            $("#edit-outlet-modal").modal('show');

                        }).catch(error=>{
                          console.log(error)
                        })
                })
        })


        const delete_outlets_buttons = document.querySelectorAll('.delete_outlets');
        console.log(delete_outlets_buttons);
        delete_outlets_buttons.forEach(delete_outlet_button=>{

            delete_outlet_button.addEventListener('click',function(e){
                if(!confirm('Are you Sure? you wan\'t delete')){
                    return
                }
                    const outlet = e.target.dataset.outlet;
                    axios.delete(`/user/${outlet}`)
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
            const outletId  = document.querySelector('#outlet_id').value
            axios.post(`/outlet/update/${outletId}`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#edit-outlet-modal").modal('hide');
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
            axios.post(`/outlet`,formData)
                 .then(response=>{
                    console.log(response)
                    $("#modal-outlet").modal('hide');
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

    $(document).ready(function(){
        // Map initialization
         var map = L.map('map').setView([23.6943117,90.344352], 8);
          /*==============================================
                TILE LAYER and WMS
    ================================================*/
        //osm layer
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        osm.addTo(map);
        map.addLayer(osm)

         // water color
    var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    });
    // watercolor.addTo(map)

    // dark map
    var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    // dark.addTo(map)

    // google street
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleStreets.addTo(map);

     //google satellite
     googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    // googleSat.addTo(map)

    // var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    //     layers: 'geoapp:admin',
    //     format: 'image/png',
    //     transparent: true,
    //     attribution: "wms test"
    // });


    /*==============================================
                        MARKER
    ================================================*/
    var myIcon = L.icon({
        iconUrl: '{{asset("red_marker.png")}}',
        iconSize: [40, 40],
    });

    function showallOutletInMap(){
        axios.get('/get/outlets').then(response=>{
            console.log(response.data.outlets);
            const {outlets}  = response.data;
            console.log(outlets);
            outlets.forEach(outlet=>{
                console.log(Number.parseFloat(outlet.longitude))
                var singleMarker = L.marker([Number.parseFloat(outlet.latitude), Number.parseFloat(outlet.longitude)], { icon: myIcon, draggable: true,title:outlet.name });
                var popup = singleMarker.bindPopup('This is the Bangladesh. ' + singleMarker.getLatLng()).openPopup()
                popup.addTo(map);
                console.log('singleMarker',singleMarker.getLatLng())
            })

        })
    }
    showallOutletInMap();
    var singleMarker = L.marker([28.3949, 84.1240], { icon: myIcon, draggable: true });
    // var popup = singleMarker.bindPopup('This is the Nepal. ' + singleMarker.getLatLng()).openPopup()
    // popup.addTo(map);

    // var secondMarker = L.marker([29.3949, 83.1240], { icon: myIcon, draggable: true });

    // console.log(singleMarker.toGeoJSON())

     /*==============================================
                GEOJSON
    ================================================*/
    // var pointData = L.geoJSON(pointJson).addTo(map)
    // var lineData = L.geoJSON(lineJson).addTo(map)
    // var polygonData = L.geoJSON(polygonJson, {
    //     onEachFeature: function (feature, layer) {
    //         layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
    //     },
    //     style: {
    //         fillColor: 'red',
    //         fillOpacity: 1,
    //         color: '#c0c0c0',
    //     }
    // }).addTo(map);



    })
</script>

@endpush

