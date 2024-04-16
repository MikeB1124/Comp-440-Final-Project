<?php
require_once "../config.php";

$sectionId = $_POST['sectionId'];
$itemName = $_POST['itemName'];
$itemDescription = $_POST['itemDescription'];
$itemImageUrl = $_POST['itemImageUrl'];
$itemPrice = $_POST['itemPrice'];

if (empty($sectionId)) {
    // Return an error response
    http_response_code(404); // Bad request
    echo "Error\nStatus Code: 404\nError Message: Could not find section id";
    exit(); // Stop script execution
}

if (empty($itemName) || empty($itemDescription) || empty($itemImageUrl) || empty($itemPrice)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: One or more values are empty";
    exit(); // Stop script execution
}

$sql = "INSERT INTO item (section_id, item_name, description, image_url, price) VALUES ($sectionId, '$itemName', '$itemDescription', '$itemImageUrl', $itemPrice)";
if ($conn->query($sql) === TRUE) {
    echo "Item added successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}