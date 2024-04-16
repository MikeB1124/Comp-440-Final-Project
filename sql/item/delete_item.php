<?php
require_once "../config.php";

$itemId = $_POST['itemId'];

$sql = "DELETE FROM item WHERE id=$itemId";
if ($conn->query($sql) === TRUE) {
    echo "Item deleted successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}