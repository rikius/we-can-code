(function (root) {

    /// ------------------------------------------------------------------------------------
    // Initialize firebase connections
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    /// ------------------------------------------------------------------------------------
    // defining marker structure
    function markerDatabaseBaseStructureData() {
        return {
            /**
             * @type {string}
             */
            id: "",
            /**
             * @type {number}
             */
            lat: 0,
            /**
             * @type {number}
             */
            lng: 0,
            /**
             * @type {string}
             */
            title: "",
            /**
             * @type {string}
             */
            description: ""
        };
    }

    /// ------------------------------------------------------------------------------------
    // creating function that will call after getting all marker items.
    function afterReadList(list) {
        console.log("list", list);

        // double check if list is an array object
        list.forEach(function (data) {
            root.mapAddMarker(fireBaseGetMarkerData(data));
        });
    }

    // creating function that will respond on child_removed
    function markersOnRemove(data) {
        root.mapRemoveMarker(fireBaseGetMarkerData(data));
    }

    // creating function that will respond on child_added
    function markersOnAdded(data) {
        root.mapAddMarker(fireBaseGetMarkerData(data));
    }

    // creating function that will respond on child_changed
    function markersOnChange(data) {
        root.mapUpdateMarker(fireBaseGetMarkerData(data));
    }

    /// ------------------------------------------------------------------------------------
    // executed function after map initialized

    // read database and show data
    function fireBaseLoadDataToMap() {
        console.log("reading data");

        var markersRef = database.ref('markers');

        // adding event listener on add
        markersRef.on('child_added', markersOnAdded);

        // adding event listener on change
        markersRef.on('child_changed', markersOnChange);

        // adding event listener on remove
        markersRef.on('child_removed', markersOnRemove);

        // querying db for markers
        markersRef.once('value', afterReadList);
    }

    /// ------------------------------------------------------------------------------------
    // after save
    function afterUpdateAddMarkerItem(error) {
        console.log("data saved", error);
    }

    // creating helper function for creating/updating marker items in firebase
    function fireBaseSaveFormData(markerData) {
        // get marker structure object.
        var copy = copyMarkerDataValues(markerData);

        var saveUpdate;

        if (copy.id) {
            saveUpdate = database.ref('markers/' + copy.id);

            // deleting id if it exists
            // because we don't want to have it as a reference in scheme
            delete copy.id;
        } else {
            saveUpdate = database.ref('markers').push();
        }


        // updating or adding post in firebase
        saveUpdate.set(copy, afterUpdateAddMarkerItem);
    }

    /// ------------------------------------------------------------------------------------
    // after removing marker item
    function afterRemoveItem(error) {
        // displaying success remove action message
        console.log("marker deleted", error);
    }

    // removing form data
    function fireBaseDeleteMarker(data) {
        if (data.id) {
            database.ref('markers/' + data.id).remove(afterRemoveItem);
        } else {
            afterRemoveItem("id is not found");
        }
    }

    /// ------------------------------------------------------------------------------------
    // utils

    // prepare data for displaying marker on map
    function fireBaseGetMarkerData(data) {
        // markerdata expecting to be as we defined it in markerDatabaseBaseStructureData.
        var markerData = data.val();

        // firebase key is in different field need to get it from different parameter.
        markerData.id = data.key;
        return markerData;
    }

    // accepting only items from stucture data.
    function copyMarkerDataValues(formMarkerData) {
        var structureObject = markerDatabaseBaseStructureData(),
            copy = {};
        for (var key in structureObject) {
            if (structureObject.hasOwnProperty(key)) {
                copy[key] = formMarkerData.hasOwnProperty(key) ? formMarkerData[key] : undefined;
            }
        }
        return copy;
    }

    /// ------------------------------------------------------------------------------------
    // exports to global
    root.fireBaseLoadDataToMap = fireBaseLoadDataToMap;
    root.fireBaseSaveFormData = fireBaseSaveFormData;
    root.fireBaseDeleteMarker = fireBaseDeleteMarker;

})(typeof self !== 'undefined' ? self : window);
