function addProd(event) {
    event.preventDefault();


    var formData = new FormData(document.getElementById("addForm"));
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '2add.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            alert(response.message);
            location.reload();
        } else {
            alert('Error: ' + xhr.status);
        }
    };

    xhr.send(formData);
}


function deleteProd(event) {
    event.preventDefault();

    var dogId = document.getElementById('deletedogId').value;

    var formData = new FormData();
    formData.append('dogId', dogId);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '2delete.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            alert(response.message);
            location.reload();
        } else {
            alert('Error: ' + xhr.status);
        }
    };

    xhr.send(formData);
}

function editProd(event) {
    event.preventDefault();

    var dogId = document.getElementById('editdogId').value;
    var dogName = document.getElementById('editdogName').value;
    var genderS = document.getElementById('editgenderS').value;
    var breedS = document.getElementById('editbreedS').value;
    var ageS = document.getElementById('editageS').value;
    var descriptionS = document.getElementById('editdescriptionS').value;
    var reasonS = document.getElementById('editreasonS').value;


    var formData = new FormData();
    formData.append('dogId', dogId);
    formData.append('dogName', dogName);
    formData.append('genderS', genderS);
    formData.append('breedS', breedS);
    formData.append('ageS', ageS);
    formData.append('descriptionS', descriptionS);
    formData.append('reasonS', reasonS);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '2edit.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            alert(response.message);
            location.reload();
        } else {
            alert('Error: ' + xhr.status);
        }
    };

    xhr.send(formData);
}

function fetchAndDisplayData() {
    fetch('dog_table.json')
    .then(response => response.json())
    .then(data => {
        const DogTableBody = document.getElementById('DogTableBody');
        DogTableBody.innerHTML = '';

        data.forEach(dog => {
            const row = `
                <tr>
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
            DogTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

window.onload = fetchAndDisplayData;
