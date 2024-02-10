<?php
require_once "config.php";

// Create database
$sql = "DROP DATABASE test";
if ($conn->query($sql) === TRUE) {
    echo "Database deleted successfully";
} else {
    echo "Error deleting database: " . $conn->error;
}