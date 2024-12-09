const inputField = document.getElementById('inputValue');
const addButton = document.getElementById('addBtn');
const sortByNameBtn = document.getElementById('sortByName');
const sortByValueBtn = document.getElementById('sortByValue');
const deleteSelectedBtn = document.getElementById('deleteSelected');
const listContainer = document.getElementById('listContainer');

let pairs = [];

function validateInput(input) {
    const regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;
    const match = input.match(regex);
    return match ? { name: match[1], value: match[2] } : null;
}

function renderList() {
    listContainer.innerHTML = '';
    pairs.forEach((pair, index) => {
        const item = document.createElement('div');
        item.className = 'list__item';
        item.innerHTML = `
                    <label>
                        <input type="checkbox" data-index="${index}">
                        ${pair.name} = ${pair.value}
                    </label>
                `;
        listContainer.appendChild(item);
    });
}

addButton.addEventListener('click', () => {
    const inputValue = inputField.value.trim();
    const parsedPair = validateInput(inputValue);
    if (parsedPair) {
        pairs.push(parsedPair);
        renderList();
        inputField.value = '';
    } else {
        alert('Invalid format. Use Name=Value with alphanumeric characters.');
    }
});

sortByNameBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.name.localeCompare(b.name));
    renderList();
});

sortByValueBtn.addEventListener('click', () => {
    pairs.sort((a, b) => a.value.localeCompare(b.value));
    renderList();
});

deleteSelectedBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#listContainer input[type="checkbox"]:checked');
    const indicesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index, 10));
    pairs = pairs.filter((_, index) => !indicesToDelete.includes(index));
    renderList();
});