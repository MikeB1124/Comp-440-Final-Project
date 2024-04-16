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

if (empty($name) && empty($address) && empty($city) && empty($postalCode) && empty($state) && empty($phone)) {
    // Return an error response
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: At least one field must be updated.";
    exit(); // Stop script execution
}

$fieldsToUpdate = [];
if (!empty($name)) {
    $fieldsToUpdate[] = "location_name = '$name'";
}
if (!empty($address)) {
    $fieldsToUpdate[] = "address = '$address'";
}
if (!empty($city)) {
    $fieldsToUpdate[] = "city = '$city'";
}
if (!empty($postalCode)) {
    $fieldsToUpdate[] = "postal_code = $postalCode";
}
if (!empty($state)) {
    $fieldsToUpdate[] = "state = '$state'";
}
if (!empty($phone)) {
    $fieldsToUpdate[] = "phone = '$phone'";
}

$sql = "UPDATE location SET " . implode(", ", $fieldsToUpdate) . " WHERE id = $locationId";
if ($conn->query($sql) === TRUE) {
    echo "Location updated successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}