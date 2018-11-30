(function (root) {
    /// ------------------------------------------------------------------------------------
    // local variable for accessing created map.
    var googleMap;

    /// ------------------------------------------------------------------------------------
    // initializing map
    function initMap() {
        console.log("map ready");

        var myLatLng = {lat: 54.8898944, lng: 23.7871816};

        googleMap = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            styles: [
                {
                    featureType: "transit.station",
                    stylers: [{visibility: "off"}] // Turn off bus, train stations etc.
                }
            ],
            disableDoubleClickZoom: true,
            streetViewControl: false,
            center: myLatLng
        });
        googleMap.addListener("click", onMapClickEvent);

        root.fireBaseLoadDataToMap();
    }

    /// ------------------------------------------------------------------------------------

    // adding new marker to map.
    // it is used when getting markers from backend
    function mapAddMarker(markerData) {
        console.log("add marker", markerData);
    }
    /// ------------------------------------------------------------------------------------

    // specify on map click event
    function onMapClickEvent(event) {
        createTempDraggingMarker(googleMap, event.latLng);
    }

    // specify on marker drag end event
    function onMarkerDragEnd() {
        // updating after drag end marker
        root.showFromData(getMarkerData(tempDraggingMarker, {}));
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
            tempDraggingMarker.addListener("dragend", onMarkerDragEnd);
        } else {
            // restoring map
            tempDraggingMarker.setMap(googleMap);
            // updating marker position after click on map.
            tempDraggingMarker.setPosition(position);
        }

        // shows form information after clicking on map
        root.showFromData(getMarkerData(tempDraggingMarker, {}));
    }

    // ------------------------------------------------------------------------------------

    function getMarkerData(marker, markerData) {
        var id = "";
        if (markerData.id) {
            id = markerData.id;
        }
        var title = "";
        if (markerData.title) {
            title = markerData.title;
        }
        var description = "";
        if (description.title) {
            title = description.title;
        }
        return {
            id: id,
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
            title: title,
            description: description
        };
    }

    // ------------------------------------------------------------------------------------
    // exposing to global
    root.initMap = initMap;
    root.mapAddMarker = mapAddMarker;
})(typeof self !== "undefined" ? self : window);
