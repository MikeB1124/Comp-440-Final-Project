//Load all locations in manager select menu
function loadLocations() {
    $.ajax({
        type: "GET",
        url: "../sql/location/get_locations.php",
        success: function(response){
            let locations = JSON.parse(response)

            var selectLocation = document.querySelector('.select-location');
            if (locations.length > 0){
                locations.forEach(location => {
                    var option = document.createElement('option');
                    option.setAttribute('class', 'location-option');
                    option.setAttribute('value', location["Location_Name"])
                    option.setAttribute('id', location["ID"])
                    option.text = `${location["Location_Name"]} (${location["Address"]})`
                    selectLocation.appendChild(option)
                });
            }
        }
    });
}

function cleanUpPreviousLocation(locationId){
    let menuAccordion = document.querySelector(".menu-container")
    if (menuAccordion){
        while(menuAccordion.firstChild){
            menuAccordion.removeChild(menuAccordion.firstChild)
        }
    }

    if(!document.querySelector(".update-location-button")){
        let updateButton = document.createElement("button")
        updateButton.setAttribute("type", "button")
        updateButton.setAttribute("class", "btn btn-secondary update-location-button")
        updateButton.setAttribute("data-bs-toggle", "modal")
        updateButton.setAttribute("data-bs-target", "#updateLocationModal")
        updateButton.setAttribute("locationId", locationId)
        updateButton.innerText = "Update Location"

        let removeButton = document.createElement("button")
        removeButton.setAttribute("type", "button")
        removeButton.setAttribute("class", "btn btn-danger remove-location-button")
        removeButton.setAttribute("locationId", locationId)
        removeButton.innerText = "Remove Location"

        let locationContainer = document.querySelector(".location-button-container")
        locationContainer.appendChild(updateButton)
        locationContainer.appendChild(removeButton)
    
        removeButton.addEventListener('click', function(event){
            removeLocation(event.target.attributes.locationid.value)
        })
    }else{
        let updateButton = document.querySelector(".update-location-button")
        updateButton.setAttribute("locationId", locationId)
        let removeButton = document.querySelector(".remove-location-button")
        removeButton.setAttribute("locationId", locationId)
    }
}

//Get Sections
function getSections(locationId){
    $.ajax({
        type: "GET",
        url: `../sql/section/get_sections.php?locationId=${locationId}`,
        success: function(response){
            let sections = JSON.parse(response);
            if (sections.length > 0){
                createBaseTable(sections)
                getItems(sections)
            }
        }
    });
}

//Get Items
function getItems(sections){
    sections.forEach(section => {
        $.ajax({
            type: "GET",
            url: `../sql/item/get_items.php?sectionId=${section["ID"]}`,
            success: function(response){
                let items = JSON.parse(response);
                if (items.length > 0){
                    insertItemsInTables(items)
                }
            }
        });
    });
}

//Listen for location selection
let selectLocation = document.querySelector(".select-location");
selectLocation.addEventListener('click', function(event){
    if(event.target.id != "0"){
        cleanUpPreviousLocation(event.target.id)
        getSections(event.target.id)
    }else{
        if(document.querySelector(".update-location-button")){
            let updateButton = document.querySelector(".update-location-button")
            let removeButton = document.querySelector(".remove-location-button")
            updateButton.remove()
            removeButton.remove()
        }
        let menuAccordion = document.querySelector(".menu-container")
        if (menuAccordion){
            while(menuAccordion.firstChild){
                menuAccordion.removeChild(menuAccordion.firstChild)
            }
        }
    }
})

function createBaseTable(sections){
    let menuContainer = document.querySelector(".menu-container")
    sections.forEach(section => {
        let sectionRow = document.createElement('div')
        sectionRow.setAttribute("class", `row mt-4 section-row-${section["ID"]}`)

        let headerTitle = document.createElement('h1')
        headerTitle.setAttribute("class", `section-header-title section-title-${section["ID"]}`)
        headerTitle.innerText = section["Section_Name"]

        sectionRow.appendChild(headerTitle)

        let sectionTable = document.createElement("table")
        sectionTable.setAttribute("class", `table section-table-${section["ID"]}`)

        let tableHead = document.createElement("thead")
        
        let tableColOne = document.createElement("th")
        tableColOne.setAttribute("scope", "col")
        tableColOne.innerText = "Name"

        let tableColTwo = document.createElement("th")
        tableColTwo.setAttribute("scope", "col")
        tableColTwo.innerText = "Price"

        let tableColThird = document.createElement("th")
        tableColThird.setAttribute("scope", "col")
        tableColThird.innerText = "Actions"

        tableHead.appendChild(tableColOne)
        tableHead.appendChild(tableColTwo)
        tableHead.appendChild(tableColThird)

        let tableBody = document.createElement("tbody")
        tableBody.setAttribute("class", `table-body-section-${section["ID"]}`)

        sectionTable.appendChild(tableHead)
        sectionTable.appendChild(tableBody)

        sectionRow.appendChild(sectionTable)
        menuContainer.appendChild(sectionRow)
    });
}


function insertItemsInTables(items){
    items.forEach(item => {
        let sectionTableBody = document.querySelector(`.table-body-section-${item["Section_ID"]}`)

        let tableDataRow = document.createElement("tr")
        tableDataRow.setAttribute("value", item["ID"])

        let itemName = document.createElement("td")
        itemName.innerText = item["Item_Name"]

        let itemPrice = document.createElement("td")
        itemPrice.innerText = `$${item["Price"]}`

        let itemActions = document.createElement("td")
        itemActions.innerText = "Comming Soon"

        tableDataRow.appendChild(itemName)
        tableDataRow.appendChild(itemPrice)
        tableDataRow.appendChild(itemActions)

        sectionTableBody.appendChild(tableDataRow)
    });
}


//Adding a new location
let addLocationModalButton = document.querySelector(".add-location-modal-button")
addLocationModalButton.addEventListener('click', function(){
    let name = document.querySelector(".add-location-name-input").value
    let address = document.querySelector(".add-location-address-input").value
    let city = document.querySelector(".add-location-city-input").value
    let postalCode = document.querySelector(".add-location-postal-code-input").value
    let state = document.querySelector(".add-location-state-input").value
    let phone = document.querySelector(".add-location-phone-input").value

    $.ajax({
        type: "POST",
        url: `../sql/location/add_location.php`,
        data: {
            name: name,
            address: address,
            city: city,
            postalCode: postalCode,
            state: state,
            phone: phone
        },
        success: function(response){
            alert(response)
            location.reload()
        },
        error: function(response){
            alert(response.responseText)
        }
    });
})

//Remove Location
function removeLocation(locationId){
    $.ajax({
        type: "POST",
        url: `../sql/location/delete_loaction.php`,
        data: {
            locationId: locationId,
        },
        success: function(response){
            alert(response)
            location.reload()
        },
        error: function(response){
            alert(response.responseText)
        }
    });
}



let updateLocationModalButton = document.querySelector(".update-location-modal-button")
updateLocationModalButton.addEventListener('click', function(){
    let name = document.querySelector(".update-location-name-input").value
    let address = document.querySelector(".update-location-address-input").value
    let city = document.querySelector(".update-location-city-input").value
    let postalCode = document.querySelector(".update-location-postal-code-input").value
    let state = document.querySelector(".update-location-state-input").value
    let phone = document.querySelector(".update-location-phone-input").value
    let locationId = getCurrentLocation()

    $.ajax({
        type: "POST",
        url: `../sql/location/update_location.php`,
        data: {
            locationId: locationId,
            name: name,
            address: address,
            city: city,
            postalCode: postalCode,
            state: state,
            phone: phone
        },
        success: function(response){
            alert(response)
            location.reload()
        },
        error: function(response){
            alert(response.responseText)
        }
    });
})

function getCurrentLocation(){
    let updateLocationButton = document.querySelector(".update-location-button")
    return updateLocationButton.attributes.locationid.value
}