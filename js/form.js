!(function(root) {

    /// ------------------------------------------------------------------------------------
    // updating form data from marker
    function showFromData(data) {

        // hiding delete button when we creating new element.
        // Delete is not needed in this state.
        if (data.id) {
            document.getElementById("marker-button-delete").style.display = "inline-block";
        } else {
            document.getElementById("marker-button-delete").style.display = "none";
        }

        //fill form values
        document.getElementById("marker-id").value = data.id;
        document.getElementById("marker-lat").value = data.lat;
        document.getElementById("marker-lng").value = data.lng;
        document.getElementById("marker-title").value = data.title;
        document.getElementById("marker-description").value = data.description;

        document.getElementById("marker-form").style.opacity = "1";
    }

    /// ------------------------------------------------------------------------------------
    // specify on form submit event
    function onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        // saving form data
        console.log(getFormObject());
    }

    /// ------------------------------------------------------------------------------------
    // specify on cancel click event
    function onCancelClick(mouseEvent) {
        // stopping default click event behavior
        mouseEvent.preventDefault();

        // hiding form
        document.getElementById("marker-form").style.opacity = "0";
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

    // triggering cancel element
    document
        .getElementById("marker-button-cancel")
        .addEventListener("click", onCancelClick);

    /// ------------------------------------------------------------------------------------
    // exposing to global
    root.showFromData = showFromData;

})(typeof self !== "undefined" ? self : window);
