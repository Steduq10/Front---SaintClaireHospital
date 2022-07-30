import { postPatient, deletePatient, putPatient } from "./actionPatient.js";
const form = document.querySelector('.patients-form');


/*getAllPatient().then(patients => {
    state = patients;
    recreatePatients(patients);
});*/
let state = [];

form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmitPatient(e));
function handleSubmitPatient(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.name-input') 
  const ageInput = document.querySelector('.age-input') 
  const identificationNumberInput = document.querySelector('.identificationNumber-input') 
  const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input') 
  const dateAppointmentInput = document.querySelector('.dayAppointment-input') 
    if (nameInput.value&&identificationNumberInput.value&&ageInput.value&&numberOfAppointmentsInput.value&&dateAppointmentInput.value) {
       
        const newPatient = {
            id: null,
            name: nameInput.value,
            age: ageInput.value,
            identificationNumber: identificationNumberInput.value,
            numberOfAppointments: numberOfAppointmentsInput.value,
            dateAppointment: dateAppointmentInput.value,
            fkSpecialtyId: fkSpecialtyIdInput.value
        };
        postPatient(newPatient).then(response => {
            if (response.status === 200) {
                state.push(newPatient);
                createReminder(newPatient);
                nameInput.value = '';
                ageInput.value = '';
                identificationNumberInput.value = '';
                numberOfAppointmentsInput.value = '';
                dateAppointmentInput.value = '';
                fkSpecialtyIdInput.value = '';
            }
        });
    }
}
function createPatient(patient) {
    const patientContainer = document.querySelector('.patient-container');
    const div = document.createElement('div');
    div.className = 'single-patient-container';
    div.classList.add(`patient-${patient.id}`);
    const nameP = document.createElement('p');
    nameP.className = `single-patient-name-${patient.id}`
    nameP.innerText = patient.name
    
    const ageP = document.createElement('p')
    ageP.className = `single-patient-physician-${patient.id}`
    ageP.innerText = patient.age
    
    const identificationNumberP = document.createElement('p')
    identificationNumberP.className = `single-patient-physician-${patient.id}`
    identificationNumberP.innerText = patient.identificationNumber
    
    const numberOfAppointmentsP = document.createElement('p')
    numberOfAppointmentsP.className = `single-patient-physician-${patient.id}`
    numberOfAppointmentsP.innerText = patient.numberOfAppointments

    const dateAppointmentP = document.createElement('p')
    dateAppointmentP.className = `single-patient-physician-${patient.id}`
    dateAppointmentP.innerText = patient.dateAppointment

    const fkSpecialtyIdP = document.createElement('p')
    fkSpecialtyIdP.className = `single-fkSpecialtyId-physician-${patient.id}`
    fkSpecialtyIdP.innerText = patient.fkSpecialtyId
  
    const deleteButton = document.createElement('button')
    deleteButton.className = 'single-patient-delete-button'
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', ()=> handleDelete(div))
  
    const editButton = document.createElement('button')
    editButton.className = 'single-patient-edit-button'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', ()=> hanldeEdit(patient))
  
    div.append(nameP, ageP, identificationNumberP, numberOfAppointmentsP, dateAppointmentP,fkSpecialtyIdP, deleteButton, editButton) 
    patientContainer.append(div)
}
function hanldeEdit(patient) {
    const nameInput = document.querySelector('.title-input');
    const ageInput = document.querySelector('.age-input');
    const identificationNumberInput = document.querySelector('.identificationNumber-input');
    const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input');
    const dateAppointmentInput = document.querySelector('.dateAppointment-input');
    const fkSpecialtyIdInput = document.querySelector('.fkSpecialtyId-input')
    
    const submitButton = document.querySelector('.specialist-form-button')
    submitButton.classList.add('display_none')
  
    const editButton = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(patient, nameInput, ageInput, identificationNumberInput, numberOfAppointmentsInput, dateAppointmentInput))
  
    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)
    
    nameInput.value = patient.name
    ageInput.value = patient.age;
    identificationNumberInput.value = patient.identificationNumber;
    numberOfAppointmentsInput.value = patient.numberOfAppointments;
    dateAppointmentInput.value = patient.dateAppointment;
    fkSpecialtyIdInput.value = patient.fkSpecialtyId;
}
function executeEdition(specialistPatient, name, physician) {
   
    const patientEdited = {
        id:patient.id,
        name:name.value,
        age: age.value,
        identificationNumber: identificationNumber.value,
        numberOfAppointments: numberOfAppointments.value,
        dateAppointment: dateAppointment.value,
        fkSpecialtyId: fkSpecialtyId.value
    };
    putPatient(patientEdited).then(response => {
        if (response.status === 200) {
            const newState = state.map(specialistPatient => specialistPatient.id === patientsEdited.id?patientsEdited:patient)
            state = newState;
          
            const pName = document.querySelector(`.single-patient-name-${patient.id}`)
            pName.innerText = patientsEdited.name
            const pAge = document.querySelector(`.single-patient-age-${patient.id}`)
            pAge.innerText = patientsEdited.age
            const pIdentificationNumber = document.querySelector(`.single-patient-identification-${patient.id}`)
            pIdentificationNumber.innerText = patientsEdited.identificationNumber
            const pNumberOfAppointments = document.querySelector(`.single-patient-approintments-${patient.id}`)
            pNumberOfAppointments.innerText = patientsEdited.numberOfAppointments
            const pDateAppointment = document.querySelector(`.single-patient-date-${patient.id}`)
            pDateAppointment.innerText = patientsEdited.dateAppointment
            const pFkSpecialtyId = document.querySelector(`.single-patient-fkSpecialtyId-${patient.id}`)
            pFkSpecialtyId.innerText = patientsEdited.fkSpecialtyId
            
            name.value = ''
            age.value = ''
            identificationNumber.value = '',
            numberOfAppointments.value = '',
            dateAppointment.value = '',
            fkSpecialtyId.value = ''
    
            const submitButton = document.querySelector('.patients-form-button')
            submitButton.classList.remove('display_none')
          
            const editButton = document.querySelector('.form-edit-button') 
          
            editButton.remove()
        }
    });
}
function handleDelete(div) {
    const id = div.classList[1].split('-')[1]
    deletePatient(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newState = state.filter(patient => patient.id !== parseInt(id))
        state = newState
        }
    });
}
function recreatePatients(patient) {
    patient.forEach(patient => createPatient(patient));
}

