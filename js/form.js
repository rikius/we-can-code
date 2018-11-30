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
    // specify on form submit event
    function onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        // saving form data
        console.log(getFormObject());
    }

    /// ------------------------------------------------------------------------------------
    // utils

    // converting form data to object
    function getFormObject() {
        return {
            id: document.getElementById("marker-id").value,
            lat: document.getElementById("marker-lat").value,
            lng: document.getElementById("marker-lng").value,
            title: document.getElementById("marker-title").value,
            description: document.getElementById("marker-description").value
        };
    }

    /// ------------------------------------------------------------------------------------
    // form submit event
    document
        .getElementById("marker-form")
        .addEventListener("submit", onFormSubmit);

    /// ------------------------------------------------------------------------------------
    // exposing to global
    root.showFromData = showFromData;

})(typeof self !== "undefined" ? self : window);
