<?php
require_once "../config.php";


$sql = "SELECT * FROM location";
$result = $conn->query($sql);
$locations = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
    
    // Return JSON response
    echo json_encode($locations);
} else {
    echo json_encode($locations);
}