<?php
require_once "../config.php";

$menuId = $_GET['menuId'];
$sql = "SELECT * FROM section ";
$sql .= "WHERE menu_id = $menuId";
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