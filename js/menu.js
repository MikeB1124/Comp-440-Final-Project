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
        // getSections(selectLocation.value)
    }else{
        let menuContainer = document.querySelector(".menu-container")
        let defaultHeader = document.createElement("h1")
        defaultHeader.innerHTML = "Please select a location to display a menu."
        menuContainer.appendChild(defaultHeader)
    }
})


//Get Sections
function getSections(locationId){
    $.ajax({
        type: "GET",
        url: `controllers/section/get_sections.php?locationId=${locationId}`,
        success: function(response){
            let sections = JSON.parse(response);
            if (sections.length > 0){
                console.log(sections)
                createBaseTable(sections)
                // getItems(sections)
            }
        }
    });
}

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

                    menuContainer.appendChild(locationName)
                    menuContainer.appendChild(locationAddress)
                    menuContainer.appendChild(locationPhoneNumber)
                }
            });
        }
    });
}

//Create Base Table for Menu
function createBaseTable(sections){
    sections.forEach(section => {
        let menuContainer = document.querySelector(".menu-container")
        console.log("hello world")
    });
}