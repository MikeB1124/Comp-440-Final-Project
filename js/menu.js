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
        //Create Menu
    }else{
        let menuContainer = document.querySelector(".menu-container")
        let defaultHeader = document.createElement("h1")
        defaultHeader.innerHTML = "Please select a location to display a menu."
        menuContainer.appendChild(defaultHeader)
    }
})