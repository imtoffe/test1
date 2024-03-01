<?php
require_once("2dbconn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $deletedogID = $_POST['dogId'];

    $sql = "DELETE FROM dog_table WHERE dog_id=?";
    
    $deleteStmt = $conn->prepare($sql);
    $deleteStmt->bind_param("i", $deletedogID);

    if ($deleteStmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Dog Application is deleted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error in deleting Dog Application']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

header('Content-Type: application/json');
$conn->close();
?>
