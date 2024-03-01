<?php
require_once("2dbconn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dogName = $_POST['dogName'];
    $genderS = $_POST['genderS'];
    $breedS = $_POST['breedS'];
    $ageS = $_POST['ageS'];
    $descriptionS = $_POST['descriptionS'];
    $reasonS = $_POST['reasonS'];
    $photoS = $_POST['photoS'];
    $pdfS = $_POST['pdfS'];
    $verificationS = $_POST['verificationS'];

    $sql = "INSERT INTO dog_table (dog_name, gender, breed, age, description, reason, photo, pdf, verification)
    VALUES (?,?,?,?,?,?,?,?,?)";

    $insertStmt = $conn->prepare($sql);
    $insertStmt->bind_param("sssssssss", $dogName, $genderS, $breedS, $ageS, $descriptionS, $reasonS , $photoS, $pdfS, $verificationS);


    if ($insertStmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Dog Application is added successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error in adding Dog Application']);
    }
}else{
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

header('Content-Type: application/json');

$conn->close();
?>