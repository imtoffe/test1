<?php
require_once("2dbconn.php");

$sql = "SELECT * FROM dog_table";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$jsonData = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
file_put_contents('dog_table.json',$jsonData);

$conn->close();
?>