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
            <div class="row bg-white pt-2">
                <!-- Start col -->
                <div class="col-md-12">
                  <!-- Placeholder for the Google Map -->
                    <div id="map" style="height: 512px;">
                        <noscript>
                        <!-- http://code.google.com/apis/maps/documentation/staticmaps/ -->
                        <img src="http://maps.google.com/maps/api/staticmap?center=1%20infinite%20loop%20cupertino%20ca%2095014&amp;zoom=16&amp;size=512x512&amp;maptype=roadmap&amp;sensor=false" />
                        </noscript>
                    </div>

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
                            <h4 class="modal-title"></h4>
                        </div>
                        <div class="modal-body">
                            <form id="formOpt" name="formOpt" class="form-horizontal" action="#">
                                <input type="hidden" name="id">
                                <div id="type-wrap" class="form-group">
                                    <label class="control-label col-md-3">Type</label>
                                    <div class="col-md-9">
                                        <select id="form-type" class="form-control" name="type">
                                            <option value="administrator">Administrator</option>
                                            <option value="patrolman">Patrolman</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="user-wrap" class="form-group">
                                    <label class="control-label col-md-3">Email</label>
                                    <div class="col-md-9">
                                        <input id="formOpt-username" class="form-control" name="email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">Owner</label>
                                    <div class="col-md-9">
                                        <input class="form-control" name="name">
                                    </div>
                                </div>
                                <div id="formOpt-ztree" class="form-group">
                                    <label class="control-label col-md-3">Organization</label>
                                    <div class="col-md-9 ztree-height">
                                        <ul id="opt-tree" class="ztree"></ul>
                                    </div>
                                </div>
                                <div id="role-wrap" class="form-group">
                                    <label class="control-label col-md-3">Role</label>
                                    <div class="col-md-9">
                                        <select id="formOpt-roleIds" name="roleIds[]" class="form-control" multiple>

                                            {{-- <option value="54">Sub Admin</option>
                                            <option value="56">KFG-User</option>
                                            <option value="117">Elite Force Admin</option>
                                            <option value="128">Dev-role</option>
                                            <option value="144">Falcon Admin</option> --}}
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
            {{-- end of modal sections --}}
        </div><!-- /.container-fluid -->
    </div>
@endsection

@push('js')

<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
<script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-map.js?key=F7NeWUxCoi4SUIio3Gyw66YHADM0upyB"></script>
    <script src="https://www.mapquestapi.com/sdk/leaflet/v2.2/mq-routing.js?key=F7NeWUxCoi4SUIio3Gyw66YHADM0upyB"></script>
  {{-- <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> --}}
<script type="text/javascript">

//   // Define the address we want to map.
//   var address = "1 infinite loop cupertino ca 95014";

//   // Create a new Geocoder
//   var geocoder = new google.maps.Geocoder();

//   // Locate the address using the Geocoder.
//   geocoder.geocode( { "address": address }, function(results, status) {

//     // If the Geocoding was successful
//     if (status == google.maps.GeocoderStatus.OK) {

//       // Create a Google Map at the latitude/longitude returned by the Geocoder.
//       var myOptions = {
//         zoom: 16,
//         center: results[0].geometry.location,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//       };
//       var map = new google.maps.Map(document.getElementById("map"), myOptions);

//       // Add a marker at the address.
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });

//     } else {
//       try {
//         console.error("Geocode was not successful for the following reason: " + status);
//       } catch(e) {}
//     }
//   });
// var map = L.map('map', {
//     center: [23.6850,  90.3563],
//     zoom: 13,
//     preferCanvas:true
// });


// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
// L.marker([26.287279, 83.515869]).addTo(map)
//     .bindPopup('Muhammadd pur')
//     .openPopup();

//     var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
//     layers: 'nexrad-n0r-900913',
//     format: 'image/png',
//     transparent: true,
//     attribution: "Weather data © 2012 IEM Nexrad"
// });

</script>
 <script type="text/javascript">
    window.onload = function() {

        var map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [40.731701, -73.993411],
            zoom: 12
        });

        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                'wood-ridge, nj',
                'staten island, ny',
                'queens, ny'
            ]
        });

        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: function (location, stopNumber) {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=poi-red_1.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            },

            createEndMarker: function (location, stopNumber) {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=poi-blue_1.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            }
        });

        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        }));
    }
</script>
@endpush

