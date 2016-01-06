var observableModule = require("data/observable");
var sliderModule = require("ui/slider");
var viewModule = require("ui/core/view");

var pageData = new observableModule.Observable({
    latitude: -33.86,
    longitude: 151.20,
    zoom: 8
})

pageData.on("propertyChange", function(data){
    console.log("change", data.object.zoom)
})

//var slider = new sliderModule.Slider();


exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    var slider = viewModule.getViewById(page,"sliderZoom");
    slider.maxValue = 18;
    slider.minValue = 5;
};


function OnMapReady(args) {
  var mapView = args.object;
  var gMap = mapView.gMap;
 
  console.log("Setting a marker...foo");
 
    if(mapView.android) {
        var markerOptions = new com.google.android.gms.maps.model.MarkerOptions();
        markerOptions.title("Sydney");
        markerOptions.snippet("Australia");
        var latLng = new com.google.android.gms.maps.model.LatLng(-33.86, 151.20);
        markerOptions.position(latLng);
        gMap.addMarker(markerOptions);
    } 
 
    if (mapView.ios) {
        var position = CLLocationCoordinate2DMake(-33.86, 151.20);
        var marker = GMSMarker.markerWithPosition(position)
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.map = gMap;
    }
}
exports.OnMapReady = OnMapReady;
