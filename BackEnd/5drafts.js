function fetchAndDisplayData() {
    fetch('dog_table.json')
    .then(response => response.json())
    .then(data => {
        const AdminTableBody = document.getElementById('AdminTableBody');
        AdminTableBody.innerHTML = '';

        data.forEach(dog => {
            const row = `
                <tr>
                    <td><input type="checkbox" class="selectCheckbox"></td>
                    <td>${dog.dog_id}</td>
                    <td>${dog.dog_name}</td>
                    <td>${dog.gender}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.age}</td>
                    <td>${dog.description}</td>
                    <td>${dog.reason}</td>
                    <td>${dog.verification}</td>

                </tr>
            `;
            AdminTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

window.onload = fetchAndDisplayData;

//Adding Display
function addSelectedDogs() {
    const checkboxes = document.querySelectorAll('.selectCheckbox:checked');

    checkboxes.forEach(checkbox => {
        const selectedDogRow = checkbox.closest('tr');
        const dogDetails = {
            dog_name: selectedDogRow.cells[2].textContent,
            gender: selectedDogRow.cells[3].textContent,
            breed: selectedDogRow.cells[4].textContent,
            age: selectedDogRow.cells[5].textContent,
            description: selectedDogRow.cells[6].textContent,
            reason: selectedDogRow.cells[7].textContent,
            verification: selectedDogRow.cells[8].textContent,
        };

        // Now, let's submit the form with the dog details
        submitDogForm(dogDetails);
    });
}

function submitDogForm(dogDetails) {
    const form = document.getElementById('adminForm');
    
    // Update form fields with dog details
    form['dogName'].value = dogDetails.dog_name;
    form['genderS'].value = dogDetails.gender;
    form['breedS'].value = dogDetails.breed;
    form['ageS'].value = dogDetails.age;
    form['descriptionS'].value = dogDetails.description;
    form['reasonS'].value = dogDetails.reason;
    form['verificationS'].value = dogDetails.verification;

    // Submit the form
    form.submit();
}


// Add this function to handle deleting selected dogs
function deleteSelectedDogs() {
    const checkboxes = document.querySelectorAll('.selectCheckbox:checked');
    const selectedDogIds = Array.from(checkboxes).map(checkbox => checkbox.parentNode.nextElementSibling.textContent);

    if (selectedDogIds.length === 0) {
        alert("No dogs selected for deletion.");
        return;
    }

    // Assuming adoptiondisplay.php handles the deletion logic
    fetch('adoptiondisplay.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete', dogIds: selectedDogIds }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle success, you may want to update the UI accordingly
        console.log('Dogs deleted successfully:', data);
        // Here, you might want to visually mark the deleted dogs in the table
        checkboxes.forEach(checkbox => checkbox.closest('tr').style.textDecoration = 'line-through');
    })
    .catch(error => console.error('Error deleting dogs:', error));
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.selectCheckbox');
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}



window.onload = function() {
    fetchAndDisplayData();

    // Add event listener for select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox.addEventListener('change', toggleSelectAll);
};




// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// Dog Display

function openAdoptPopup(url) {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
}

function openAdoptPopup(dogName) {
    // You can pass additional data if needed
    var popupUrl = '4adopt.php?dog=' + encodeURIComponent(dogName);
    window.open(popupUrl, '_blank', 'width=600,height=400,scrollbars=yes');
}

let cardCount = 0; // Initial card count

function openAddDogForm() {
    cardCount++;
    const newDogName = `Dog Name ${cardCount}`;
    const dogGrid = document.querySelector('.dog-grid');

    // Create a new dog card element
    const newDogCard = document.createElement('div');
    newDogCard.className = 'dog-card';
    newDogCard.innerHTML = `
        <div class="dog-photo"></div>
        <div class="dog-info">
            <h3>${newDogName}</h3>
            <p>Description about the dog.</p>
            <button class="favorite-button">❤ Favorites</button>
            <button class="adopt-button" onclick="openAdoptPopup('${newDogName}')">Adopt</button>
        </div>
    `;

    // Append the new dog card to the dog grid
    dogGrid.appendChild(newDogCard);

    // After adding the dog, open the adoption popup with the new dog's name
    openAdoptPopup(newDogName);
}

function openAdoptPopup(dogName) {
    var popupUrl = '4adopt.php?dog=' + encodeURIComponent(dogName);
    window.open(popupUrl, '_blank', 'width=600,height=400,scrollbars=yes');
}


function fetchAndDisplayData() {
    fetch('dog_table.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const AdminTableBody = document.getElementById('AdminTableBody');
            AdminTableBody.innerHTML = '';

            data.forEach(dog => {
                const row = `
                    <tr>
                        <td><input type="checkbox" class="selectCheckbox"></td>
                        <td>${dog.dog_id}</td>
                        <td>${dog.dog_name}</td>
                        <td>${dog.gender}</td>
                        <td>${dog.breed}</td>
                        <td>${dog.age}</td>
                        <td>${dog.description}</td>
                        <td>${dog.reason}</td>
                        <td>${dog.verification}</td>
                    </tr>
                `;
                AdminTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchAndDisplaySavedData() {
    fetch('saved_dogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                console.warn('Invalid saved data format. Expected an array.');
                return [];
            }
            return data;
        })
        .then(data => {
            data.forEach(dog => {
                displayDogCard(dog);
            });
        })
        .catch(error => console.error('Error fetching or parsing saved data:', error));
}

function saveDogToJSON(dogDetails) {
    fetch('saved_dogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            data.push(dogDetails);

            // Log the updated data to the console (for debugging purposes)
            console.log('Updated Data:', data);

            // Update the saved_dogs.json file with the new data
            return fetch('saved_dogs.json', {
                method: 'POST',  // Change to POST for adding new data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // Optionally, handle success or other logic
            console.log('Dog data saved successfully.');
        })
        .catch(error => console.error('Error saving dog data:', error));
}

function displayDogCard(dogDetails) {
    const card = document.createElement('div');
    card.classList.add('dog-card');

    card.innerHTML = `
        <h3>${dogDetails.dog_name}</h3>
        <p>Gender: ${dogDetails.gender}</p>
        <p>Breed: ${dogDetails.breed}</p>
        <p>Age: ${dogDetails.age}</p>
        <p>Description: ${dogDetails.description}</p>
        <p>Reason: ${dogDetails.reason}</p>
        <p>Verification: ${dogDetails.verification}</p>
    `;

    document.body.appendChild(card);
}

function addSelectedDogs() {
    const checkboxes = document.querySelectorAll('.selectCheckbox:checked');

    checkboxes.forEach(checkbox => {
        const selectedDogRow = checkbox.closest('tr');
        const dogDetails = {
            dog_name: selectedDogRow.cells[2].textContent,
            gender: selectedDogRow.cells[3].textContent,
            breed: selectedDogRow.cells[4].textContent,
            age: selectedDogRow.cells[5].textContent,
            description: selectedDogRow.cells[6].textContent,
            reason: selectedDogRow.cells[7].textContent,
            verification: selectedDogRow.cells[8].textContent,
        };

        displayDogCard(dogDetails);
    });
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.selectCheckbox');
    checkboxes.forEach(checkbox => (checkbox.checked = selectAllCheckbox.checked));
}

window.onload = function () {
    fetchAndDisplayData();
    fetchAndDisplaySavedData();

    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', toggleSelectAll);
    } else {
        console.error("Element with ID 'selectAllCheckbox' not found.");
    }
};