const createButton = document.querySelector('[data-action="create"]');
const emptyPanel = document.querySelector('[data-state-panel="empty"]');
const editorPanel = document.querySelector('[data-state-panel="editor"]');
const viewerPanel = document.querySelector('[data-state-panel="viewer"]');

function switchBetweenPanels(panelToHide, panelToShow){
    panelToHide.hidden = true;
    panelToShow.hidden = false;
}

createButton.addEventListener("click", () => switchBetweenPanels(emptyPanel, editorPanel));

const STORAGE_KEY = "albumCard";
const DRAFT_KEY = "albumDraft";
const viewerFields = document.querySelectorAll("[data-field]");

function fillCard(cardData) {
    viewerFields.forEach((field) => {
        field.textContent = cardData[field.dataset.field] || "—";
    });
}

function fillForm(cardData) {
    for (const [name, value] of Object.entries(cardData)) {
        form.elements[name].value = value;
    }  
}

function getDataObjectFormData() {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

function submitForm(event) {
    event.preventDefault();

    const dataObject = getDataObjectFormData();         
    const objectInString = JSON.stringify(dataObject);
    localStorage.setItem(STORAGE_KEY, objectInString);

    sessionStorage.removeItem(DRAFT_KEY);

    fillCard(dataObject);                                 
    switchBetweenPanels(editorPanel, viewerPanel);
}

function getSaved() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

const form = document.querySelector(".card-form");
form.addEventListener("submit", (event) => submitForm(event));
form.addEventListener("input", () => {
    const draft = getDataObjectFormData();
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
});

function cancelForm() {
    form.reset();
    sessionStorage.removeItem(DRAFT_KEY);
    const cardData = getSaved();
    if (cardData) {
        switchBetweenPanels(editorPanel, viewerPanel);
        fillForm(cardData);
    } else {
        switchBetweenPanels(editorPanel, emptyPanel);
    }
}

const cancelButton = document.querySelector('[data-action="cancel"]');
cancelButton.addEventListener("click", () => cancelForm());

const deleteSavedFormButton = document.querySelector('[data-action="delete"]');
const editButton = document.querySelector('[data-action="edit"]');

function deleteSavedForm() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(DRAFT_KEY);
    form.reset();
    switchBetweenPanels(viewerPanel, emptyPanel);
}

deleteSavedFormButton.addEventListener("click", () => deleteSavedForm());
editButton.addEventListener("click", () => switchBetweenPanels(viewerPanel, editorPanel));

const saved = localStorage.getItem(STORAGE_KEY);
const draft = sessionStorage.getItem(DRAFT_KEY);

if (saved) {
    const cardData = JSON.parse(saved);
    fillCard(cardData);
    fillForm(cardData);                                  
    switchBetweenPanels(emptyPanel, viewerPanel);
} else if (draft) {
    const draftData = JSON.parse(draft);
    fillForm(draftData);
    switchBetweenPanels(emptyPanel, editorPanel);
}