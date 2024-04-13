<?php
require_once "../config.php";

$locationId = $_GET['locationId'];
$sql = "SELECT * FROM menu ";
$sql .= "WHERE ID = $locationId";
$result = $conn->query($sql);
$menu = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $menu[] = $row;
    }
    
    // Return JSON response
    echo json_encode($menu);
} else {
    echo json_encode($menu);
}