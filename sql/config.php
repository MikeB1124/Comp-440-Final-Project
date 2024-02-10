<?php
$servername = "localhost"; // or your server address
$username = "root"; // or your MySQL username
$password = ""; // or your MySQL password

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
