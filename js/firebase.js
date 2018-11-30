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

    /// ------------------------------------------------------------------------------------
    // executed function after map initialized

    // read database and show data
    function fireBaseLoadDataToMap() {
        console.log("reading data");

        var markersRef = database.ref('markers');

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

})(typeof self !== 'undefined' ? self : window);
