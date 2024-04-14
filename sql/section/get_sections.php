<?php
require_once "../config.php";

$locationId = $_GET['locationId'];
$sql = "SELECT * FROM section ";
$sql .= "WHERE location_id = $locationId";
$result = $conn->query($sql);
$sections = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $sections[] = $row;
    }
    
    // Return JSON response
    echo json_encode($sections);
} else {
    echo json_encode($sections);
}