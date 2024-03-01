<?php
include("2dbconn.php");

$data = file_get_contents("php://input");
$dogID = json_decode($data, true)['dogID'];

    $sqlupdate = "UPDATE dog_table SET verification = 'verified' WHERE dog_id = ?";
    $statement = $conn->prepare($sqlupdate);
    $verified = "verified";
    $statement->bind_param("i", $dogID);
    $statement->execute();

     if ($statement->affected_rows > 0) {
         $responses[] = ['status' => 'success', 'message' => 'Verified'];
     } else {
         $responses[] = ['status' => 'error', 'message' => 'Failed to update verification status'];
     }

echo json_encode($responses);
$conn->close();
?>
