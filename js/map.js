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
    googleMap.addListener("click", onMapClickEvent);
  }

  /// ------------------------------------------------------------------------------------

  // specify on map click event
  function onMapClickEvent(event) {
    createTempDraggingMarker(googleMap, event.latLng);
  }

  // temp marker
  var tempDraggingMarker;

  // creating temp marker that is not saved but showing it for user.
  function createTempDraggingMarker(map, position) {
    console.log("temp marker event on map");

    if (!tempDraggingMarker) {
      tempDraggingMarker = new google.maps.Marker({
        position: position,
        draggable: true,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          strokeColor: "#393"
        }
      });
    } else {
      // restoring map
      tempDraggingMarker.setMap(googleMap);
      // updating marker position after click on map.
      tempDraggingMarker.setPosition(position);
    }
  }

  // ------------------------------------------------------------------------------------

  // exposing to global
  root.initMap = initMap;
})(typeof self !== "undefined" ? self : window);
