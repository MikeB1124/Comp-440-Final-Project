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

        let addSectionButtonContainer = document.querySelector(".add-section-button-container")
        let addSectionButton = document.createElement("button")
        addSectionButton.setAttribute("type", "button")
        addSectionButton.setAttribute("class", "btn btn-primary add-section-button")
        addSectionButton.setAttribute("data-bs-toggle", "modal")
        addSectionButton.setAttribute("data-bs-target", "#addSectionModal")
        addSectionButton.innerText = "Add Section"
        addSectionButtonContainer.appendChild(addSectionButton)
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
            let addSectionButton = document.querySelector(".add-section-button")
            updateButton.remove()
            removeButton.remove()
            addSectionButton.remove()
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
        let sectionActionContainer = document.createElement("div")
        sectionActionContainer.style.display = "flex"
        sectionActionContainer.style.justifyContent = "center"
        sectionActionContainer.style.gap = "16px"
        let updateSectionButton = document.createElement("button")
        updateSectionButton.setAttribute("type", "button")
        updateSectionButton.setAttribute("class", "btn btn-secondary update-section-button")
        updateSectionButton.setAttribute("data-bs-toggle", "modal")
        updateSectionButton.setAttribute("data-bs-target", "#updateSectionModal")
        updateSectionButton.innerText = "Update Section"
        updateSectionButton.addEventListener('click', function(){
            let updateSectionModalButton = document.querySelector(".update-section-modal-button")
            updateSectionModalButton.setAttribute("sectionid", section["ID"])
            updateSectionModalButton.setAttribute("locationid", section["Location_ID"])
        })
        let removeSectionButton = document.createElement("button")
        removeSectionButton.setAttribute("type", "button")
        removeSectionButton.setAttribute("class", "btn btn-danger remove-section-button")
        removeSectionButton.innerText = "Remove Section"
        removeSectionButton.addEventListener('click', function(){
            removeSection(section)
        })
        sectionActionContainer.appendChild(updateSectionButton)
        sectionActionContainer.appendChild(removeSectionButton)

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

        sectionRow.appendChild(sectionActionContainer)
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

//Add Section
let addSectionModalButton = document.querySelector(".add-section-modal-button")
addSectionModalButton.addEventListener('click', function(){
    let locationId = getCurrentLocation()
    let sectionName = document.querySelector(".add-section-name-input").value
    let sectionDescription = document.querySelector(".add-section-description-input").value
    $.ajax({
        type: "POST",
        url: `../sql/section/add_section.php`,
        data: {
            locationId: locationId,
            sectionName: sectionName,
            sectionDescription: sectionDescription
        },
        success: function(response){
            alert(response)
            cleanUpPreviousLocation(locationId)
            getSections(locationId)
        },
        error: function(response){
            alert(response.responseText)
        }
    });
})

//Remove Section
function removeSection(section){
    $.ajax({
        type: "POST",
        url: `../sql/section/delete_section.php`,
        data: {
            sectionId: section["ID"],
        },
        success: function(response){
            alert(response)
            cleanUpPreviousLocation(section["Location_ID"])
            getSections(section["Location_ID"])
        },
        error: function(response){
            alert(response.responseText)
        }
    });
}

//Update Section
let updateSectionModalButton = document.querySelector(".update-section-modal-button")
updateSectionModalButton.addEventListener('click', function(event){
    let locationId = event.target.attributes.locationid.value
    let sectionId = event.target.attributes.sectionid.value
    let sectionName = document.querySelector(".update-section-name-input").value
    let sectionDescription = document.querySelector(".update-section-description-input").value
    $.ajax({
        type: "POST",
        url: `../sql/section/update_section.php`,
        data: {
            sectionId: sectionId,
            sectionName: sectionName,
            sectionDescription: sectionDescription
        },
        success: function(response){
            alert(response)
            cleanUpPreviousLocation(locationId)
            getSections(locationId)
        },
        error: function(response){
            alert(response.responseText)
        }
    });
})