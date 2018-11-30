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
    root.fireBaseSaveFormData = fireBaseSaveFormData;

})(typeof self !== 'undefined' ? self : window);
