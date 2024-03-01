<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="5style.css">
    <script src="5adoptdisplay.js" defer></script>
    <?php include("fetchData.php")?>
    <?php include("fetchSavedDogs.php")?>
    <title>Admin Side</title>
</head>
<body>

<div class="container">

    <h1>ADMIN FORM ---- ADMIN ONLY</h1>
    <p>Choose dogs wisely</p>

    <h2>Dog Rehoming Application</h2>
    <form id="adminForm" onsubmit="addDataAndSave(event)" method="POST">
        <table id="AdminTable">
            <thead>
                <tr>
                    <th>Select</th>
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
            <tbody id="AdminTableBody">

            </tbody>
        </table>
    </form>

    <!-- Add this container for saved data -->
    <div id="SavedDataContainer">
        
    </div>

</div>

</body>
</html>
