<?php
require_once "../config.php";

$sectionId = $_POST['sectionId'];
$sectionName = $_POST['sectionName'];
$sectionDescription = $_POST['sectionDescription'];

if (empty($sectionId)) {
    // Return an error response
    http_response_code(404); // Bad request
    echo "Error\nStatus Code: 404\nError Message: Could not find section id";
    exit(); // Stop script execution
}

if (empty($sectionName) && empty($sectionDescription)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: At least one field must be updated.";
    exit(); // Stop script execution
}

$fieldsToUpdate = [];
if (!empty($sectionName)) {
    $fieldsToUpdate[] = "section_name = '$sectionName'";
}
if (!empty($sectionDescription)) {
    $fieldsToUpdate[] = "description = '$sectionDescription'";
}

$sql = "UPDATE section SET " . implode(", ", $fieldsToUpdate) . " WHERE id = $sectionId";
if ($conn->query($sql) === TRUE) {
    echo "Section updated successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}