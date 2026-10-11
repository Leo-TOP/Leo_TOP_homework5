const createButton = document.querySelector('[data-action="create"]');
const emptyPanel = document.querySelector('[data-state-panel="empty"]');
const editorPanel = document.querySelector('[data-state-panel="editor"]');
const viewerPanel = document.querySelector('[data-state-panel="viewer"]');

function switchBetweenPanels(panelToHide, panelToShow){
    panelToHide.hidden = true;
    panelToShow.hidden = false;
}

createButton.addEventListener("click", () => switchBetweenPanels(emptyPanel, editorPanel));



const viewerFields = document.querySelectorAll("[data-field]");

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    viewerFields.forEach((field) => {
        field.textContent = dataObject[field.dataset.field] || "—";
    })

    switchBetweenPanels(editorPanel, viewerPanel);
}

const form = document.querySelector(".card-form");
form.addEventListener("submit", (event) => submitForm(event));

function cancelForm() {
    form.reset();
    switchBetweenPanels(editorPanel, emptyPanel);
}

const cancelButton = document.querySelector('[data-action="cancel"]');
cancelButton.addEventListener("click", () => cancelForm());



const deleteSavedFormButton = document.querySelector('[data-action="delete"]');
const editButton = document.querySelector('[data-action="edit"]');

function deleteSavedForm() {
    form.reset();
    switchBetweenPanels(viewerPanel, emptyPanel);
}

deleteSavedFormButton.addEventListener("click", () => deleteSavedForm());
editButton.addEventListener("click", () => switchBetweenPanels(viewerPanel, editorPanel));
