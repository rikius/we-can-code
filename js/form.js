!(function(root) {

    /// ------------------------------------------------------------------------------------
    // updating form data from marker
    function showFromData(data) {

        // hiding delete button when we creating new element.
        // Delete is not needed in this state.
        if (data.id) {
            document.getElementById("marker-button-delete").style.display = "inline-block";
            document.getElementById("marker-button-cancel").style.display = "inline-block";
        } else {
            document.getElementById("marker-button-delete").style.display = "none";
            document.getElementById("marker-button-cancel").style.display = "none";
        }

        //fill form values
        document.getElementById("marker-id").value = data.id;
        document.getElementById("marker-lat").value = data.lat;
        document.getElementById("marker-lng").value = data.lng;
        document.getElementById("marker-title").value = data.title;
        document.getElementById("marker-description").value = data.description;

        show(document.getElementById("marker-form"));
    }

    /// ------------------------------------------------------------------------------------

    function hide(element) {
        element.style.opacity = "0";
        setTimeout(function() {
            element.style.height = "0";
            element.style.margin = "0";
            element.style.padding = "0";
            element.style.display = "none";
        }, 500);
    }

    function show(element) {
        element.style.height = "auto";
        element.style["margin-bottom"] = "1rem";
        element.style.padding = ".75rem 1.25rem";
        element.style.opacity = "1";
        element.style.display = "block";
    }

    /// ------------------------------------------------------------------------------------
    // specify on form submit event
    function onFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        // saving form data
        root.fireBaseSaveFormData(getFormObject());
    }

    /// ------------------------------------------------------------------------------------
    // specify on cancel click event
    function onCancelClick(mouseEvent) {
        // stopping default click event behavior
        mouseEvent.preventDefault();

        // hiding form
        hide(document.getElementById("marker-form"));
    }

    // ------------------------------------------------------------------------------------
    // specify on delete click event
    function onDeleteClick(mouseEvent) {
        // stopping default click event behavior
        mouseEvent.preventDefault();

        // deleting marker from fire base
        root.fireBaseDeleteMarker(getFormObject());
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


    // triggering delete element
    document
        .getElementById("marker-button-delete")
        .addEventListener("click", onDeleteClick);

    /// ------------------------------------------------------------------------------------
    // exposing to global
    root.showFromData = showFromData;

})(typeof self !== "undefined" ? self : window);
