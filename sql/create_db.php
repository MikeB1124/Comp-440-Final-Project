<?php
require_once "config.php";

// Create database
$sql = "CREATE DATABASE test";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully\nVisit http://localhost:80/phpmyadmin page to check result";
} else {
    echo "Error creating database: " . $conn->error;
}

