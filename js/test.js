let createDBButton = document.getElementById("CreateDB")
createDBButton.addEventListener('click', function(){
    $.ajax({
        type: "POST",
        url: "sql/create_db.php",
        success: function(response){
            alert(response); // Show response from PHP script
        }
    });
})

let deleteDBButton = document.getElementById("DeleteDB")
deleteDBButton.addEventListener('click', function(){
    $.ajax({
        type: "POST",
        url: "sql/delete_db.php",
        success: function(response){
            alert(response); // Show response from PHP script
        }
    });
})