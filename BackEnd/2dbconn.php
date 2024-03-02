<?php

$dbHost = "localhost"; //Host
$dbUser = "root"; //User
$dbPassword = "@winwin11";//Password
$dbName = "projectopaw"; //Database

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>