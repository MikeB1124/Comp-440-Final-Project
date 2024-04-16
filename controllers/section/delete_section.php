<?php
require_once "../config.php";

$sectionId = $_POST['sectionId'];

$sql = "DELETE FROM section WHERE id=$sectionId";
if ($conn->query($sql) === TRUE) {
    echo "Section deleted successfully";
} else {
    http_response_code(400); // Bad request
    echo "Error\nStatus Code: 400\nError Message: $sql";
    exit(); // Stop script execution
}