!(function(root) {

    /// ------------------------------------------------------------------------------------
    // updating form data from marker
    function showFromData(data) {
        //fill form values
        document.getElementById("marker-id").value = data.id;
        document.getElementById("marker-lat").value = data.lat;
        document.getElementById("marker-lng").value = data.lng;
        document.getElementById("marker-title").value = data.title;
        document.getElementById("marker-description").value = data.description;
    }

    /// ------------------------------------------------------------------------------------
    // exposing to global
    root.showFromData = showFromData;

})(typeof self !== "undefined" ? self : window);
