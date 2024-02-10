<?php
require_once "config.php";

// Create database
$sql = "DROP DATABASE test";
if ($conn->query($sql) === TRUE) {
    echo "Database deleted successfully\nVisit http://localhost:80/phpmyadmin page to check result";
} else {
    echo "Error deleting database: " . $conn->error;
}