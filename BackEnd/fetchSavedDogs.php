<?php
    include("2dbconn.php");

    $sql = "SELECT * FROM dog_table WHERE verification = 'verified'";
    $statement = $conn->prepare($sql);
    $statement->execute();
    $result = $statement->get_result();
    $dogList = $result->fetch_all(MYSQLI_ASSOC);

    $dogListArray = [];

    foreach ($dogList as $dogs){
        $dogListArray[] = [
            "dog_id"=> $dogs['dog_id'],
            "user_id"=> $dogs['user_id'],
            "dog_name"=> $dogs['dog_name'],
            "gender"=> $dogs['gender'],
            "breed"=> $dogs['breed'],
            "age"=> $dogs['age'],
            "description"=> $dogs['description'],
            "reason"=> $dogs['reason'],
            "photo"=> $dogs['photo'],
            "pdf"=> $dogs['pdf'],
            "verification"=> $dogs['verification']
        ];
    }

    $jsonDogs = json_encode($dogListArray, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    file_put_contents('saved_dogs.json',$jsonDogs);
?>