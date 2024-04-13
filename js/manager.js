//Load all locations in manager select menu
function loadLocations() {
    $.ajax({
        type: "GET",
        url: "../sql/locations/get_locations.php",
        success: function(response){
            let locations = JSON.parse(response)

            var selectMenu = document.querySelector('.select-location');
            if (locations.length > 0){
                locations.forEach(location => {
                    var option = document.createElement('option');
                    option.setAttribute('class', 'location-option');
                    option.setAttribute('value', location["Location_Name"])
                    option.setAttribute('id', location["ID"])
                    option.text = `${location["Location_Name"]} (${location["Address"]})`
                    selectMenu.appendChild(option)
                });
            }
        }
    });
}