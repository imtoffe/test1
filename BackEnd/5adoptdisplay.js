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