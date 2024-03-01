<?php
require_once("2dbconn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $editdogId = $_POST['dogId'];
    $editdogName = $_POST['dogName'];
    $editgenderS = $_POST['genderS'];
    $editbreedS = $_POST['breedS'];
    $editageS = $_POST['ageS'];
    $editdescriptionS = $_POST['descriptionS'];
    $editreasonS = $_POST['reasonS'];
    $editphotoS = $_POST['photoS'];
    $editpdfS = $_POST['pdfS'];
    $editverificationS = $_POST['verificationS'];

    $sql = "UPDATE dog_table SET dog_name=?, gender=?, breed=?, age=?, description=?, reason=?, photo=?, pdf=?, verification=? WHERE dog_id=?";
    
    $updateStmt = $conn->prepare($sql);
    $updateStmt->bind_param("sssssssssi", $editdogName, $editgenderS, $editbreedS, $editageS, $editdescriptionS, $editreasonS, $editphotoS, $editpdfS, $editverificationS, $editdogId);

    if ($updateStmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Dog Application is updated successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error in updating Dog Application']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

header('Content-Type: application/json');
$conn->close();
?>
