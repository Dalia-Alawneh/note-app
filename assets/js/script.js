const plusBtn = document.querySelector('.control-bar a');
const colorBar = document.querySelector('.control-bar .bar');
const colorsElements = document.querySelectorAll('.control-bar .bar .color');
const addModal = document.querySelector('.add-modal');
const titleInput = addModal.querySelector('input');
const bodyInput = addModal.querySelector('textarea');
const addBtn = document.getElementById('add-btn')
const updateBtn = document.getElementById('update-btn')
let selectedColor = null;
let notes = [];

plusBtn.addEventListener('click', toggleColorBar);

colorsElements.forEach((item) => {
    item.addEventListener('click', () => {
        selectedColor = item.getAttribute('data-color');
        updateBtn.classList.add('hide-btn')
        addBtn.classList.remove('hide-btn')
        showModal();
    });
});

document.querySelector('.overlay').addEventListener('click', hideModal);

addBtn.addEventListener('click', () => {
    addNote();
    displayNotes();
    resetInputFields();
    hideModal();
});

notes = JSON.parse(localStorage.getItem('notes')) || [];
displayNotes();

function toggleColorBar() {
    colorBar.classList.toggle('show');
    setTimeout(() => {
        colorsElements.forEach((item) => {
            item.classList.toggle('op-1');
        });
    }, 600);
}

function addNote() {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title !== '' && body !== '') {
        const slug = generateUniqueSlug(title);
        const isNoteExists = notes.find((note) => note.slug === slug);

        if (isNoteExists) {
            alert("Note already exists");
        } else {
            const note = { slug, title, body, color: selectedColor };
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}

function displayNotes() {
    const notesContainer = document.querySelector('.notes-container');
    notesContainer.innerHTML = '';
    notes.forEach((note) => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
}

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add(`note`);
    noteElement.classList.add(`note-${note.color}`);
    noteElement.innerHTML = `
        <div>
            <h2>${note.title}</h2>
            <p>${note.body}</p>
        </div>
        <div class="flex flex-between">
            <button class="delete-btn" onclick="deleteNote('${note.slug}')">
                <img src="assets/img/trash.png">
            </button>
            <button class="update-btn" onclick="showUpdateModal('${note.slug}', '${note.color}')">
                <img src="assets/img/edit.png">
            </button>
        </div>  
    `;
    return noteElement;
}

function deleteNote(slug) {
    const noteIndex = notes.findIndex(note => note.slug === slug);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

function showUpdateModal(slug, color) {
    const noteIndex = notes.findIndex(note => note.slug === slug);
    addBtn.style.backgroundColor = `var(--color-${color})`;
    titleInput.value = notes[noteIndex].title;
    bodyInput.value = notes[noteIndex].body;
    addBtn.classList.add('hide-btn')
    updateBtn.classList.remove('hide-btn')
    updateBtn.dataset.index = noteIndex
    showModal(noteIndex);
}

updateBtn.addEventListener('click', () => handleUpdate(updateBtn.dataset.index))

function handleUpdate(noteIndex) {
    const newTitle = titleInput.value.trim();
    const newBody = bodyInput.value.trim();
    if (newTitle !== notes[noteIndex].title) {
        console.log('ff');
        const newSlug = generateUniqueSlug(newTitle);
        const existingNote = notes.find((note) => note.slug === newSlug);
        if (existingNote) {
            alert("Note with the same title already exists");
            return
        } else {
            notes[noteIndex].title = newTitle;
            notes[noteIndex].slug = newSlug;
        }
    }
    notes[noteIndex].body = newBody;
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    resetInputFields();
    hideModal();
}


function resetInputFields() {
    titleInput.value = '';
    bodyInput.value = '';
}

function generateUniqueSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
}


document.querySelector('.delete-all-btn').addEventListener('click', () => {
    notes = []
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes()
})