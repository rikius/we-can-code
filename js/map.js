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
    // local memory storage for markers.
    var markers = {};

    var defaultIcon = {
        path:
            "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillColor: "Red",
        fillOpacity: 1,
        strokeColor: "Firebrick",
        strokeWeight: 2,
        scale: 0.7
    };

    var selectedIcon = {
        path:
            "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillColor: "Gold",
        fillOpacity: 1,
        strokeColor: "Goldenrod",
        strokeWeight: 2,
        scale: 0.7
    };

    // specify on marker click  event
    function onMarkerClick() {
        // this represents marker that is clicked on.
        var marker = this;

        setAllMarkersDefaultStyle();
        setMarkerCurrentStyle(marker);

        root.showFromData(getMarkerData(marker, marker.data));
    }

    // adding new marker to map.
    // it is used when getting markers from backend
    function mapAddMarker(markerData) {
        console.log("add marker", markerData);
        // same marker not need to remove or update it is automatically updated from google

        var key = markerData.id;

        // exits from function because we already have marker.
        if (markers[key]) {
            return;
        }

        var marker = new google.maps.Marker({
            draggable: false,
            map: googleMap,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon
        });

        marker.addListener("click", onMarkerClick);

        updateMarkerData(marker, markerData);

        markers[key] = marker;
    }

    // delete marker from map and removes from memory
    function mapRemoveMarker(markerData) {
        var key = markerData.id;
        if (markers[key]) {
            markers[key].setMap(null);
            delete markers[key];
        }
    }

    // updating existing marker.
    function mapUpdateMarker(markerData) {
        var key = markerData.id;
        var marker = markers[key];
        if (marker) {
            updateMarkerData(marker, markerData);
        } else {
            mapAddMarker(markerData);
        }
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

    function setAllMarkersDefaultStyle() {
        for (var m in markers) {
            if (markers.hasOwnProperty(m)) {
                markers[m].setIcon(defaultIcon);
            }
        }
    }

    function setMarkerCurrentStyle(marker) {
        marker.setIcon(selectedIcon);
    }

    function updateMarkerData(marker, markerData) {
        // need to convert number. because we have string from DB
        var position = { lat: Number(markerData.lat), lng: Number(markerData.lng) };
        marker.setPosition(position);

        marker.data = markerData;
    }

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
    root.mapRemoveMarker = mapRemoveMarker;
    root.mapUpdateMarker = mapUpdateMarker;

})(typeof self !== "undefined" ? self : window);
