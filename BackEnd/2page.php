<<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog Application Form</title>
    <link rel="stylesheet" href="2styles.css">
    <script src="2main.js" defer></script>
    <?php include("2read.php") ?>
</head>
<body>
<div class="container">

    <h2>Add Dog Details</h2>
    <form id="addForm" onsubmit="addProd(event)" method="POST">
        <label for="dogName">Dog Name:</label>
        <input type="text" id="dogName" name="dogName" required>

        <label for="genderS">Gender:</label>
        <input type="text" id="genderS" name="genderS" required>

        <label for="breedS">Breed:</label>
        <input type="text" id="breedS" name="breedS" required>

        <label for="ageS">Age (Puppy or Adult):</label>
        <input type="text" id="ageS" name="ageS" required>

        <label for="descriptionS">Other dog description:</label>
        <input type="text" id="descriptionS" name="descriptionS" required>

        <label for="reasonS">Reason for rehoming:</label>
        <input type="text" id="reasonS" name="reasonS" required>

        <label for="photoS">Photo:</label>
        <input type="file" name="photoS" id="photoS" accept="image/*">

        <input type="submit" value="Add Dog Application">
    </form>

    <h2>Edit Dog Details</h2>
        <form id="editForm" onsubmit="editProd(event)" method="POST">
        
        <label for="editdogId">Dog ID:</label>
        <input type="number" id="editdogId" name="editdogId" required>

        <label for="editdogName">Dog Name:</label>
        <input type="text" id="editdogName" name="editdogName" required>

        <label for="editgenderS">Gender:</label>
        <input type="text" id="editgenderS" name="editgenderS" required>

        <label for="editbreedS">Breed:</label>
        <input type="text" id="editbreedS" name="editbreedS" required>

        <label for="editageS">Age (Puppy or Adult):</label>
        <input type="text" id="editageS" name="editageS" required>

        <label for="editdescriptionS">Other dog description:</label>
        <input type="text" id="editdescriptionS" name="editdescriptionS" required>

        <label for="editreasonS">Reason for rehoming:</label>
        <input type="text" id="editreasonS" name="editreasonS" required>


            <input type="submit" value="Edit Dog Applicable">
        </form>

        <h2>Delete Dog Application</h2>
        <form id="deleteForm" onsubmit="deleteProd(event)" method="POST">
            <label for="deletedogId">Dog ID:</label>
            <input type="number" id="deletedogId" name="deletedogId" required>

            <input type="submit" value="Delete Dog Application">
        </form>

        <h2>Dog Rehoming Application</h2>
        <table id="DogTable">
            <thead>
                <tr>
                    <th>Dog ID</th>
                    <th>Dog Name</th>
                    <th>Gender</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Description</th>
                    <th>Dog Reason</th>
                    <th>Verification</th>
                </tr>
            </thead>
            <tbody id="DogTableBody">
            </tbody>
        </table>
    </div>
</body>
</html>
