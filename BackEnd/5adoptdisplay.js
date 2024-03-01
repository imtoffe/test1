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
        .then(savedData => {
            const savedDataContainer = document.getElementById('SavedDataContainer');
            savedDataContainer.innerHTML = '';

            savedData.forEach(savedDog => {
                const card = document.createElement('div');
                card.classList.add('saved-dog-card');

                card.innerHTML = `
                    <h3>${savedDog.dog_name}</h3>
                    <p>Gender: ${savedDog.gender}</p>
                    <p>Breed: ${savedDog.breed}</p>
                    <p>Age: ${savedDog.age}</p>
                    <p>Description: ${savedDog.description}</p>
                    <p>Reason: ${savedDog.reason}</p>
                    <p>Verification: ${savedDog.verification}</p>
                `;

                savedDataContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching saved data:', error));
}


function addSelectedDogs() {
    const checkboxes = document.querySelectorAll('.selectCheckbox:checked');

    checkboxes.forEach(checkbox => {
        const selectedDogRow = checkbox.closest('tr');
        const dogDetails = {
            dogName: selectedDogRow.cells[2].textContent,
            genderS: selectedDogRow.cells[3].textContent,
            breedS: selectedDogRow.cells[4].textContent,
            ageS: selectedDogRow.cells[5].textContent,
            descriptionS: selectedDogRow.cells[6].textContent,
            reasonS: selectedDogRow.cells[7].textContent,
            verificationS: selectedDogRow.cells[8].textContent,
        };

        addDataAndSave();  // Replace with your appropriate function if needed
    });
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

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.selectCheckbox');
    checkboxes.forEach(checkbox => (checkbox.checked = selectAllCheckbox.checked));
}

fetchAndDisplayData();
fetchAndDisplaySavedData();

const selectAllCheckbox = document.getElementById('selectAllCheckbox');
if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', toggleSelectAll);
} else {
    console.error("Element with ID 'selectAllCheckbox' not found.");
}
