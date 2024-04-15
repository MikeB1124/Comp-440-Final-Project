<?php
require_once "../config.php";

$locationId = $_POST['locationId'];
$sectionName = $_POST['sectionName'];
$sectionDescription = $_POST['sectionDescription'];

if (empty($locationId)) {
    // Return an error response
    http_response_code(404); // Bad request
    echo "Error\nStatus Code: 404\nError Message: Could not find location id";
    exit(); // Stop script execution
}

if (empty($sectionName) || empty($sectionDescription)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: One or more values are empty";
    exit(); // Stop script execution
}

$sql = "INSERT INTO Section (location_id, section_name, description) VALUES ($locationId, '$sectionName', '$sectionDescription')";
if ($conn->query($sql) === TRUE) {
    echo "Section added successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}