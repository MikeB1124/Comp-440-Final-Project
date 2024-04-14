<?php
require_once "../config.php";

$locationId = $_POST['locationId'];
$name = $_POST['name'];
$address = $_POST['address'];
$city = $_POST['city'];
$postalCode = $_POST['postalCode'];
$state = $_POST['state'];
$phone = $_POST['phone'];

if (empty($locationId)) {
    // Return an error response
    http_response_code(404); // Bad request
    echo "Error\nStatus Code: 404\nError Message: Could not find location id";
    exit(); // Stop script execution
}

if (empty($name) || empty($address) || empty($city) || empty($postalCode) || empty($state) || empty($phone)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: One or more values are empty";
    exit(); // Stop script execution
}

// $sql = "INSERT INTO Location (location_name, address, city, postal_Code, state, phone) VALUES ('$name', '$address', '$city', $postalCode, '$state', '$phone')";
$sql = "UPDATE location SET
        location_name = '$name',
        address = '$address',
        city = '$city',
        postal_code = $postalCode,
        state = '$state',
        phone = '$phone'
        WHERE id = $locationId";
if ($conn->query($sql) === TRUE) {
    echo "Location updated successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}