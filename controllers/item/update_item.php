<?php
require_once "../config.php";

$itemId = $_POST['itemId'];
$itemName = $_POST['itemName'];
$itemDescription = $_POST['itemDescription'];
$itemImageUrl = $_POST['itemImageUrl'];
$itemPrice = $_POST['itemPrice'];

if (empty($itemId)) {
    // Return an error response
    http_response_code(404); // Bad request
    echo "Error\nStatus Code: 404\nError Message: Could not find item id";
    exit(); // Stop script execution
}

if (empty($itemName) && empty($itemDescription) && empty($itemImageUrl) && empty($itemPrice)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: At least one field must be updated.";
    exit(); // Stop script execution
}

$fieldsToUpdate = [];
if (!empty($itemName)) {
    $fieldsToUpdate[] = "item_name = '$itemName'";
}
if (!empty($itemDescription)) {
    $fieldsToUpdate[] = "description = '$itemDescription'";
}
if (!empty($itemImageUrl)) {
    $fieldsToUpdate[] = "image_url = '$itemImageUrl'";
}
if (!empty($itemPrice)) {
    $fieldsToUpdate[] = "price = $itemPrice";
}

$sql = "UPDATE item SET " . implode(", ", $fieldsToUpdate) . " WHERE id = $itemId";
if ($conn->query($sql) === TRUE) {
    echo "Item updated successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}