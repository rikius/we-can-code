(function(root) {
  /// ------------------------------------------------------------------------------------
  // local variable for accessing created map.
  var googleMap;


  // initializing map
  function initMap() {
    console.log("map ready");

    var myLatLng = { lat: 54.8898944, lng: 23.7871816 };

    googleMap = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      styles: [
        {
          featureType: "transit.station",
          stylers: [{ visibility: "off" }] // Turn off bus, train stations etc.
        }
      ],
      disableDoubleClickZoom: true,
      streetViewControl: false,
      center: myLatLng
    });
  }

  // exposing to global
  root.initMap = initMap;
})(typeof self !== "undefined" ? self : window);
