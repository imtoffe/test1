function addDataAndSave(event) {
    event.preventDefault();
    addSelectedDogs();
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
                        <td><button type="button" onclick="updateDog(${dog.dog_id})">Verify Application</button></td>
                        <td>${dog.dog_id}</td>
                        <td>${dog.dog_name}</td>
                        <td>${dog.gender}</td>
                        <td>${dog.breed}</td>
                        <td>${dog.age}</td>
                        <td>${dog.reason}</td>
                        <td>${dog.description}</td>
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
                    <img src="${savedDog.photo}" class="dog-photo"></img>
                    <p><b>Gender</b>: ${savedDog.gender}</p>
                    <p><b>Breed</b>: ${savedDog.breed}</p>
                    <p><b>Age</b>: ${savedDog.age}</p>
                    <p><b>Description</b>: ${savedDog.description}</p>
                    <button class="favorite-button" onClick="favorite(${savedDog.dog_id}")>Favorite</button>
                    <button class="adopt-button" onClick="adopt(${savedDog.dog_id}")>Adopt</button>
                `;

                savedDataContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching saved data:', error));
}

function updateDog(dogID){
    fetch('updateDog.php', {
        method: 'POST',
        body: JSON.stringify({ dogID: dogID }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Verification Changed!");
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
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
