<?php
require_once "../config.php";

$name = $_POST['name'];
$address = $_POST['address'];
$city = $_POST['city'];
$postalCode = $_POST['postalCode'];
$state = $_POST['state'];
$phone = $_POST['phone'];


if (empty($name) || empty($address) || empty($city) || empty($postalCode) || empty($state) || empty($phone)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: One or more values are empty";
    exit(); // Stop script execution
}

$sql = "INSERT INTO Location (location_name, address, city, postal_Code, state, phone) VALUES ('$name', '$address', '$city', $postalCode, '$state', '$phone')";
if ($conn->query($sql) === TRUE) {
    echo "Location added successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}