<?php

$dbHost = "localhost"; //Host
$dbUser = "root"; //User
$dbPassword = "@20030309jjd";//Password
$dbName = "projectopaw"; //Database

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>