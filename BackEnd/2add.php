<?php
require_once("2dbconn.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dogName = $_POST['dogName'];
    $genderS = $_POST['genderS'];
    $breedS = $_POST['breedS'];
    $ageS = $_POST['ageS'];
    $descriptionS = $_POST['descriptionS'];
    $reasonS = $_POST['reasonS'];
    
    // Handle file upload
    $photoS = uploadImage('photoS');

    $sql = "INSERT INTO dog_table (dog_name, gender, breed, age, description, reason, photo)
    VALUES (?,?,?,?,?,?,?)";

    $insertStmt = $conn->prepare($sql);
    $insertStmt->bind_param("sssssss", $dogName, $genderS, $breedS, $ageS, $descriptionS, $reasonS, $photoS);

    if ($insertStmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Dog Application is added successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error in adding Dog Application']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

function uploadImage($inputName) {
    if (isset($_FILES[$inputName]) && $_FILES[$inputName]['error'] == UPLOAD_ERR_OK) {
        $filename   = uniqid() . "-" . time();
        $extension  = pathinfo($_FILES[$inputName]["name"], PATHINFO_EXTENSION);
        $basename   = $filename . "." . $extension;
        
        $source       = $_FILES[$inputName]["tmp_name"];
        $destination  = "Uploads/{$basename}";
        
        /* move the file */
        if (move_uploaded_file($source, $destination)) {
            // Return the image path if upload is successful
            return $destination;
        } else {
            // Return the default image path if upload fails
            return 'path/to/default_image.jpg';
        }
    }

    // If no image is uploaded, return a default image path
    return 'path/to/default_image.jpg';  
}

header('Content-Type: application/json');
$conn->close();
?>
