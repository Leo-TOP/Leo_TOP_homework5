const createButton = document.querySelector('[data-action="create"]');
const emptyPanel = document.querySelector('[data-state-panel="empty"]');
const editorPanel = document.querySelector('[data-state-panel="editor"]');

createButton.addEventListener("click", () => {
    emptyPanel.hidden = true;
    editorPanel.hidden = false;
});

const form = document.querySelector(".card-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const checkObject = Object.fromEntries(formData);
    console.log(checkObject);
});