//Load all locations in manager select menu
function loadLocations() {
    $.ajax({
        type: "GET",
        url: "../controllers/location/get_locations.php",
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
        url: `../controllers/section/get_sections.php?locationId=${locationId}`,
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
            url: `../controllers/item/get_items.php?sectionId=${section["ID"]}`,
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
        sectionActionContainer.style.marginBottom = "32px"
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
        let addItemButton = document.createElement("button")
        addItemButton.setAttribute("type", "button")
        addItemButton.setAttribute("class", "btn btn-primary add-item-button")
        addItemButton.setAttribute("data-bs-toggle", "modal")
        addItemButton.setAttribute("data-bs-target", "#addItemModal")
        addItemButton.innerText = "Add Item"
        addItemButton.addEventListener('click', function(){
            let addItemModalButton = document.querySelector(".add-item-modal-button")
            addItemModalButton.setAttribute("sectionid", section["ID"])
        })

        sectionActionContainer.appendChild(addItemButton)
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

        let tableColThree = document.createElement("th")
        tableColThree.setAttribute("scope", "col")
        tableColThree.src = "Image Link"

        let tableColFour = document.createElement("th")
        tableColFour.setAttribute("scope", "col")
        tableColFour.innerText = "Actions"

        tableHead.appendChild(tableColOne)
        tableHead.appendChild(tableColTwo)
        tableHead.appendChild(tableColThree)
        tableHead.appendChild(tableColFour)

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

        let itemImageUrl = document.createElement("td")
        let imageUrlAnchorTag = document.createElement("a")
        imageUrlAnchorTag.href = item["Image_Url"]
        imageUrlAnchorTag.target = "_blank"
        imageUrlAnchorTag.innerText = item["Image_Url"].split('.com')[0] + '.com'
        itemImageUrl.appendChild(imageUrlAnchorTag)

        let itemActions = document.createElement("td")
        itemActions.style.display = "flex"
        itemActions.style.gap = "8px"
        itemActions.style.justifyContent = "center"
        let updateItemButton = document.createElement("button")
        updateItemButton.setAttribute("type", "button")
        updateItemButton.setAttribute("class", "btn btn-secondary update-item-button")
        updateItemButton.setAttribute("data-bs-toggle", "modal")
        updateItemButton.setAttribute("data-bs-target", "#updateItemModal")
        updateItemButton.innerText = "Update"
        updateItemButton.addEventListener('click', function(){
            let updateItemModalButton = document.querySelector(".update-item-modal-button")
            updateItemModalButton.setAttribute("itemid", item["ID"])
        })
        let removeItemButton = document.createElement("button")
        removeItemButton.setAttribute("type", "button")
        removeItemButton.setAttribute("class", "btn btn-danger remove-item-button")
        removeItemButton.setAttribute("itemid", item["ID"])
        removeItemButton.innerText = "Remove"
        removeItemButton.addEventListener('click', function(event){
            removeItem(event.target.attributes.itemid.value)
        })
        itemActions.appendChild(updateItemButton)
        itemActions.appendChild(removeItemButton)

        tableDataRow.appendChild(itemName)
        tableDataRow.appendChild(itemPrice)
        tableDataRow.appendChild(itemImageUrl)
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
        url: `../controllers/location/add_location.php`,
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
        url: `../controllers/location/delete_loaction.php`,
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
        url: `../controllers/location/update_location.php`,
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
        url: `../controllers/section/add_section.php`,
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
        url: `../controllers/section/delete_section.php`,
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
        url: `../controllers/section/update_section.php`,
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

//Remove Item
function removeItem(itemId){
    let locationId = getCurrentLocation()
    $.ajax({
        type: "POST",
        url: `../controllers/item/delete_item.php`,
        data: {
            itemId: itemId,
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
}

//Update Item
let udpateItemModalButton = document.querySelector(".update-item-modal-button")
udpateItemModalButton.addEventListener('click', function(event){
    let itemId = event.target.attributes.itemid.value
    let locationId = getCurrentLocation()
    let itemName = document.querySelector(".update-item-name-input").value
    let itemDescription = document.querySelector(".update-item-description-input").value
    let itemImageUrl = document.querySelector(".update-item-image-input").value
    let itemPrice = document.querySelector(".update-item-price-input").value
    $.ajax({
        type: "POST",
        url: `../controllers/item/update_item.php`,
        data: {
            itemId: itemId,
            itemName: itemName,
            itemDescription: itemDescription,
            itemImageUrl: itemImageUrl,
            itemPrice: itemPrice
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

let addItemModalButton = document.querySelector(".add-item-modal-button")
addItemModalButton.addEventListener('click', function(event){
    let locationId = getCurrentLocation()
    let sectionId = event.target.attributes.sectionid.value
    let itemName = document.querySelector(".add-item-name-input").value
    let itemDescription = document.querySelector(".add-item-description-input").value
    let itemImageUrl = document.querySelector(".add-item-image-input").value
    let itemPrice = document.querySelector(".add-item-price-input").value

    $.ajax({
        type: "POST",
        url: `../controllers/item/add_item.php`,
        data: {
            sectionId: sectionId,
            itemName: itemName,
            itemDescription: itemDescription,
            itemImageUrl: itemImageUrl,
            itemPrice: itemPrice
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