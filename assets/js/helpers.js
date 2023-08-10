function showModal() {
    addModal.classList.remove('hide-modal');
    document.querySelector('.overlay').classList.remove('hide-overlay');
    // if (selectedColor) {
    //     addNoteButton.style.backgroundColor = `var(--color-${selectedColor})`;
    // }
}


function hideModal() {
    addModal.classList.add('hide-modal');
    document.querySelector('.overlay').classList.add('hide-overlay');
    // addNoteButton.style.backgroundColor = ''; 
}