<?php
require_once("2dbconn.php");

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $displaydogName = isset($_POST['dogName']) ? trim($_POST['dogName']) : '';
    $displaygenderS = isset($_POST['genderS']) ? trim($_POST['genderS']) : '';
    $displaybreedS = isset($_POST['breedS']) ? trim($_POST['breedS']) : '';
    $displayageS = isset($_POST['ageS']) ? trim($_POST['ageS']) : '';
    $displaydescriptionS = isset($_POST['descriptionS']) ? trim($_POST['descriptionS']) : '';
    $displayreasonS = isset($_POST['reasonS']) ? trim($_POST['reasonS']) : '';
    $displayverificationS = isset($_POST['verificationS']) ? trim($_POST['verificationS']) : '';

    // Basic input validation
    if (empty($displaydogName) || empty($displaygenderS) || empty($displaybreedS) || empty($displayageS) || empty($displaydescriptionS) || empty($displayreasonS) || empty($displayverificationS)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Retrieve existing data from the JSON file
    $jsonFile = 'saved_dogs.json';
    $existingData = json_decode(file_get_contents($jsonFile), true) ?: [];

    // Add the new dog card data
    $newDogCard = [
        'dog_name' => $displaydogName,
        'gender' => $displaygenderS,
        'breed' => $displaybreedS,
        'age' => $displayageS,
        'description' => $displaydescriptionS,
        'reason' => $displayreasonS,
        'verification' => $displayverificationS
    ];

    $existingData[] = $newDogCard;

    // Save the updated data back to the JSON file
    $result = file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT));

    if ($result !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Dog Application is added successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error updating JSON file.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close();
?>
