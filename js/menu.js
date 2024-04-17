//Load all locations in manager select menu
function loadLocations() {
    $.ajax({
        type: "GET",
        url: "controllers/location/get_locations.php",
        success: function(response){
            let locations = JSON.parse(response)
            var selectLocation = document.querySelector('.select-menu-location');
            if (locations.length > 0){
                locations.forEach(location => {
                    var option = document.createElement('option');
                    option.setAttribute('class', 'location-option');
                    option.setAttribute('value', location["ID"])
                    option.text = `${location["Location_Name"]} (${location["Address"]})`
                    selectLocation.appendChild(option)
                });
            }
        }
    });
}


function cleanUpPreviousLocation(){
    let menuContainer = document.querySelector(".menu-container")
    if (menuContainer){
        while(menuContainer.firstChild){
            menuContainer.removeChild(menuContainer.firstChild)
        }
    }
}


//Listen for location selection
let selectLocation = document.querySelector(".select-menu-location");
selectLocation.addEventListener('click', function(){
    cleanUpPreviousLocation()
    if(selectLocation.value != "0"){
        createMenuHeader(selectLocation.value)
    }else{
        let menuContainer = document.querySelector(".menu-container")
        let defaultHeader = document.createElement("h1")
        defaultHeader.innerHTML = "Please select a location to display a menu."
        menuContainer.appendChild(defaultHeader)
    }
})


function createMenuHeader(locationId){
    $.ajax({
        type: "GET",
        url: `controllers/location/get_locations.php`,
        success: function(response){
            let locations = JSON.parse(response);
            let menuContainer = document.querySelector(".menu-container")
            locations.forEach(location => {
                if(location["ID"] == locationId){
                    let locationName = document.createElement("h1")
                    locationName.innerText = location["Location_Name"]
                    let locationAddress = document.createElement("h2")
                    locationAddress.innerText = `${location["Address"]}, ${location["City"]} ${location["State"]} ${location["Postal_Code"]}`
                    let locationPhoneNumber = document.createElement("h2")
                    locationPhoneNumber.innerText = location["Phone"]
                    locationPhoneNumber.style.marginBottom = "64px";

                    menuContainer.appendChild(locationName)
                    menuContainer.appendChild(locationAddress)
                    menuContainer.appendChild(locationPhoneNumber)
                }
            });
            getSections(locationId)
        }
    });
}


//Get Sections
function getSections(locationId){
    $.ajax({
        type: "GET",
        url: `controllers/section/get_sections.php?locationId=${locationId}`,
        success: function(response){
            let sections = JSON.parse(response);
            if (sections.length > 0){
                createBaseTable(sections)
                getItems(sections)
            }
        }
    });
}


//Create Base Table for Menu
function createBaseTable(sections){
    let menuContainer = document.querySelector(".menu-container")
    sections.forEach(section => {
        let columnContainer = document.createElement("div")
        columnContainer.setAttribute("class", "col")
        columnContainer.style.marginBottom = "64px"

        let sectionHeader = document.createElement("h1")
        sectionHeader.innerText = section["Section_Name"]

        let sectionContainer = document.createElement("div")
        sectionContainer.setAttribute("class", `section-container section-${section["ID"]}`)
        sectionContainer.style.display = "flex"
        sectionContainer.style.justifyContent = "center"
        sectionContainer.style.gap = "32px"
        sectionContainer.style.flexWrap = "wrap"

        columnContainer.appendChild(sectionHeader)
        columnContainer.appendChild(sectionContainer)
        menuContainer.appendChild(columnContainer)
    });
}


//Get Items
function getItems(sections){
    sections.forEach(section => {
        $.ajax({
            type: "GET",
            url: `controllers/item/get_items.php?sectionId=${section["ID"]}`,
            success: function(response){
                let items = JSON.parse(response);
                insertItems(items)
            }
        });
    });
}

function insertItems(items){
    items.forEach(item => {
        let sectionContainer = document.querySelector(`.section-${item["Section_ID"]}`)

        let cardContainer = document.createElement("div")
        cardContainer.setAttribute("class", "card")
        cardContainer.style.width = "250px"
        cardContainer.style.height = "300px"

        let img = document.createElement("img")
        img.setAttribute("class", "card-img-top")
        img.src = item["Image_Url"]
        img.style.width = "250px"
        img.style.height = "150px"

        cardContainer.appendChild(img)

        let cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")

        let cardHeader = document.createElement("h5")
        cardHeader.setAttribute("class", "card-title")
        cardHeader.innerText = `${item["Item_Name"]} ($${item["Price"]})`

        let cardParagraph = document.createElement("p")
        cardParagraph.setAttribute("class", "card-text")
        cardParagraph.innerText = item["Description"]

        cardBody.appendChild(cardHeader)
        cardBody.appendChild(cardParagraph)

        cardContainer.appendChild(cardBody)

        sectionContainer.appendChild(cardContainer)
    });
}