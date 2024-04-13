<?php
require_once "../config.php";

$sectionId = $_GET['sectionId'];
$sql = "SELECT * FROM item ";
$sql .= "WHERE section_id = $sectionId";
$result = $conn->query($sql);
$items = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    
    // Return JSON response
    echo json_encode($items);
} else {
    echo json_encode($items);
}