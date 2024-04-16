<?php
require_once "../config.php";

$locationId = $_POST['locationId'];

$sql = "DELETE FROM location WHERE id=$locationId";
if ($conn->query($sql) === TRUE) {
    echo "Location deleted successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}