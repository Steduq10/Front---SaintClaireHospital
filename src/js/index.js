import { getAllSpecialistPatient, postSpecialistPatient, deleteSpecialist, putSpecialist } from "./actions";
const form = document.querySelector('.specialtiesPatients-form');
class Patient {
    constructor(id, age, identificationNumber, numberOfAppointments, dateAppointment) {
        this.id = id;
        this.age = age;
        this.identificationNumber = identificationNumber;
        this.numberOfAppointments = numberOfAppointments;
        this.dateAppointment = dateAppointment;
    }
}
getAllSpecialistPatient().then(specialistPatients => {
    state = specialistPatients;
    recreateNotes(specialistPatients);
});
let state = [];
let patientList = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.name-input');
    const physicianInput = document.querySelector('.physician-input');
    if (nameInput.value && physicianInput.value) {
        //const date = new Date()
        //date.setHours(date.getHours() - 5)
        const newSpecialistPatient = {
            id: null,
            name: nameInput.value,
            physicianCharge: physicianInput.value,
            patientList
            //date: date.toISOString()
        };
        postSpecialistPatient(newSpecialistPatient).then(response => {
            if (response.status === 200) {
                state.push(newSpecialistPatient);
                createReminder(newSpecialistPatient);
                nameInput.value = '';
                physicianInput.value = '';
            }
        });
    }
}
function createReminder(specialistPatient) {
    const specialistContainer = document.querySelector('.specialist-container');
    const div = document.createElement('div');
    div.className = 'single-specialist-container';
    div.classList.add(`specialist-${specialistPatient.id}`);
    const nameP = document.createElement('h2');
    nameP.className = `single-specialist-name-${specialistPatient.id}`;
    nameP.innerText = specialistPatient.name;
    const physicianP = document.createElement('p');
    physicianP.className = `single-specialist-physician-${specialistPatient.id}`;
    physicianP.innerText = specialistPatient.physicianCharge;
    /*const dateP:HTMLParagraphElement = document.createElement('p')
    dateP.className = `single-note-date-${note.id}`
    dateP.innerText = note.date*/
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-specialist-delete-button';
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', () => handleDelete(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'edit';
    editButton.addEventListener('click', () => hanldeEdit(specialistPatient));
    div.append(nameP, physicianP, deleteButton, editButton);
    specialistContainer.append(div);
}
function hanldeEdit(specialistPatient) {
    const nameInput = document.querySelector('.title-input');
    const physicianInput = document.querySelector('.physician-input');
    const submitButton = document.querySelector('.specialist-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(specialistPatient, nameInput, physicianInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    nameInput.value = specialistPatient.name;
    physicianInput.value = specialistPatient.physicianCharge;
}
function executeEdition(specialistPatient, name, physician) {
    /*const date = new Date();
    date.setHours(date.getHours() - 5)*/
    const specialistEdited = {
        id: specialistPatient.id,
        name: name.value,
        physicianCharge: physician.value,
        patientList
        //date: date.toISOString()
    };
    putSpecialist(specialistEdited).then(response => {
        if (response.status === 200) {
            const newState = state.map(specialistPatient => specialistPatient.id === specialistEdited.id ? specialistEdited : specialistPatient);
            state = newState;
            const h2Name = document.querySelector(`.single-specialist-name-${specialistPatient.id}`);
            h2Name.innerText = specialistEdited.name;
            const pPhysician = document.querySelector(`.single-note-reminder-${specialistPatient.id}`);
            pPhysician.innerText = specialistEdited.physicianCharge;
            /* const pDate = document.querySelector(`.single-note-date-${note.id}`) as HTMLParagraphElement
             pDate.innerText = noteEdited.date*/
            name.value = '';
            physician.value = '';
            const submitButton = document.querySelector('.patients-form-button');
            submitButton.classList.remove('display_none');
            const editButton = document.querySelector('.form-edit-button');
            editButton.remove();
        }
    });
}
function handleDelete(div) {
    const id = div.classList[1].split('-')[1];
    deleteSpecialist(id).then(response => {
        if (response.status === 200) {
            div.remove();
            const newState = state.filter(specialistPatient => specialistPatient.id !== parseInt(id));
            state = newState;
        }
    });
}
function recreateNotes(specialistPatient) {
    specialistPatient.forEach(specialistPatient => createReminder(specialistPatient));
}
