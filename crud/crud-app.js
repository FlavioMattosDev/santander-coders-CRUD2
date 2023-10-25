let carsData = JSON.parse(localStorage.getItem('carsData')) || [];
//Esta linha deveria estar dentro do renderCarsList, para que a atualização pudesse ser realizada de fato.

const form = document.getElementById('carsForm');
const carsList = document.getElementById('carsList');

function renderCarsList() {
	carsList.innerHTML = '';
	carsData.forEach((car, index) => {
		const carItem = document.createElement('div');
		carItem.className = 'car-item';

		const brandImage = `./images/${car.brand.toLowerCase()}.webp`;
		const brandImageElement = `<img src="${brandImage}" alt="${car.brand}" style="width: 50px; height: 50px; border-radius: 15px; "/>`;

		carItem.innerHTML = `
            <p><strong>Nome:</strong> ${car.name}</p>
            <p><strong>Modelo:</strong> ${car.model}</p>
            <p><strong>Portas:</strong> ${car.doors}</p>
            <p><strong>Cor:</strong> ${car.colour}</p>
            <p><strong>Marca:</strong> ${car.brand}</p>
            ${brandImageElement}<br>
            <button class="updateBtn" onclick="editCar(${index})">Editar</button>
            <button class="deleteBtn" onclick="deleteCar(${index})">Deletar</button>
        `;
		carsList.appendChild(carItem);
	});
}

function updateCarsListPeriodically() {
	renderCarsList();
	setInterval(renderCarsList, 5000);
}

function addCar(name, model, doors, colour, brand) {
	carsData.push({ name, model, doors, colour, brand });
	localStorage.setItem('carsData', JSON.stringify(carsData));
	renderCarsList();
}

function editCar(index) {
	const carToEdit = carsData[index];
	document.getElementById('name').value = carToEdit.name;
	document.getElementById('model').value = carToEdit.model;
	document.getElementById('doors').value = carToEdit.doors;
	document.getElementById('colour').value = carToEdit.colour;
	document.getElementById('brand').value = carToEdit.brand;

	carsData.splice(index, 1);
	localStorage.setItem('carsData', JSON.stringify(carsData));
	renderCarsList();
}

function deleteCar(index) {
	const confirmDelete = confirm(
		'Você tem certeza que quer deletar este veículo?'
	);
	if (confirmDelete) {
		carsData.splice(index, 1);
		localStorage.setItem('carsData', JSON.stringify(carsData));
		renderCarsList();
	}
}

form.addEventListener('submit', function (event) {
	event.preventDefault();
	const name = document.getElementById('name').value;
	const model = document.getElementById('model').value;
	const doors = document.getElementById('doors').value;
	const colour = document.getElementById('colour').value;
	const brand = document.getElementById('brand').value;

	if (name && model && doors && colour && brand) {
		addCar(name, model, doors, colour, brand);
		form.reset();
	} else {
		alert('Todos os campos são necessários!');
	}
});

window.onload = function () {
	renderCarsList();
	updateCarsListPeriodically();
};
