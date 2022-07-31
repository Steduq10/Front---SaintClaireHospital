import { getAllSpecialistPatient, postSpecialistPatient, deleteSpecialist, putSpecialist } from "./actions.js";
import { postPatient, deletePatient, putPatient } from "./actionPatient.js";
const form = document.querySelector('.specialtiesPatients-form');

getAllSpecialistPatient().then(specialistPatients => {
    state = specialistPatients;
    recreateSpecialist(specialistPatients);
});
let state = [];
let patientList = [];

form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.name-input');
    const physicianInput = document.querySelector('.physician-input');
    if (nameInput.value && physicianInput.value) {
       
        const newSpecialistPatient = {
            id: null,
            name: nameInput.value,
            physicianCharge: physicianInput.value,
            patientList: []
            
        };
        postSpecialistPatient(newSpecialistPatient).then(response => {
            if (response.status === 200) {
                state.push(newSpecialistPatient);
                createSpecialistPatient(newSpecialistPatient);
                nameInput.value = '';
                physicianInput.value = '';
                patientList = '';
            }
        });
    }
}
function createSpecialistPatient(specialistPatient) {
    const specialistContainer = document.querySelector('.specialist-container');
    const div = document.createElement('div');
    div.className = 'single-specialist-container';
    div.classList.add(`specialist-${specialistPatient.id}`);
    const nameP = document.createElement('h2');
    nameP.className = `single-specialist-name-${specialistPatient.id}`;
    nameP.innerText = "Dr. " + specialistPatient.name;
    const physicianP = document.createElement('p');
    physicianP.className = `single-specialist-physician-${specialistPatient.id}`;
    physicianP.innerText = "Especialty: " + specialistPatient.physicianCharge;
    const patientsP = document.createElement('p');
    patientsP.className = `single-specialist-patients-${specialistPatient.id}`;
    patientsP.innerText = "Patients list: " + specialistPatient.patientList;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-specialist-delete-button';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => handleDelete(specialistPatient));
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => hanldeEdit(specialistPatient));
    div.append(nameP, physicianP,patientsP, deleteButton, editButton);
    specialistContainer.append(div);
    
}
function hanldeEdit(specialistPatient) {
    const nameInput = document.querySelector('.title-input');
    const physicianInput = document.querySelector('.physician-input');
    //const patientInput = document.querySelector('.patient-input');
    const submitButton = document.querySelector('.specialist-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(specialistPatient, nameInput, physicianInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    nameInput.value =  specialistPatient.name;
    physicianInput.value = specialistPatient.physicianCharge;
}
function executeEdition(specialistPatient, name, physician) {
    
    const specialistEdited = {
        id: specialistPatient.id,
        name: name.value,
        physicianCharge: physician.value,
        //patientList: patientList.value,
        
    };
    putSpecialist(specialistEdited).then(response => {
        if (response.status === 200) {
            const newState = state.map(specialistPatient => specialistPatient.id === specialistEdited.id ? specialistEdited : specialistPatient);
            state = newState;
            const h2Name = document.querySelector(`.single-specialist-name-${specialistPatient.id}`);
            h2Name.innerText = specialistEdited.name;
            const pPhysician = document.querySelector(`.single-note-physician-${specialistPatient.id}`);
            pPhysician.innerText = specialistEdited.physicianCharge;

           // const pPatientList = document.querySelector(`.single-note-patientList-${specialistPatient.id}`);
           // pPatientList.innerText = specialistEdited.patientList;
            
            name.value = '';
            physician.value = '';
          //  patientList.value = '';
            const submitButton = document.querySelector('.specialist-form-button');
            submitButton.classList.remove('display_none');
            const editButton = document.querySelector('.form-edit-button');
            editButton.remove();
        }
    });
}
function handleDelete(specialistPatient){
    // const id:string = div.classList[1].split('-')[1]
     deleteSpecialist(specialistPatient).then(response => {
       const specialistPatientDiv = document.querySelector(`#speciality-${specialistPatient.id}`)
       if(response.status === 200){
         
         specialistPatientDiv.remove()
         const newState = state.map(specialistPatient => specialistPatientDiv.id === specialistPatient.id?specialistPatientDiv:specialistPatient)
         state = newState;
         
       }
     })
   }
function recreateSpecialist(specialistPatient) {
    specialistPatient.forEach(specialistPatient => createSpecialistPatient(specialistPatient));
}

const formPatient = document.querySelector('.patients-form');

let statePatient = [];

formPatient === null || formPatient === void 0 ? void 0 : formPatient.addEventListener('submit', (e) => handleSubmitPatient(e));
function handleSubmitPatient(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.namePatient-input') 
  const ageInput = document.querySelector('.agePatient-input') 
  const identificationNumberInput = document.querySelector('.identificationNumber-input') 
  //const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input') 
  const dateAppointmentInput = document.querySelector('.dayAppointment-input') 
    if (nameInput.value&&identificationNumberInput.value&&ageInput.value&&dateAppointmentInput.value) {
       
        const newPatient = {
            id: null,
            name: nameInput.value,
            age: ageInput.value,
            identificationNumber: identificationNumberInput.value,
            numberOfAppointments: numberOfAppointmentsInput.value,
            fkSpecialtyId: fkSpecialtyIdInput.value,
            dateAppointment: dateAppointmentInput.value
        };

        let exist = false;
        patients?.forEach(patient =>{
            if(patient.identificationNumber === newPatient.identificationNumber){
                exist = true
            }
        })

        if(exist){
            alert("Patient exist")
            return;
        }
        postPatient(newPatient).then(response => {
            if (response.status === 200) {
                statePatient.push(newPatient);
                createPatient(newPatient);
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
    deleteButton.addEventListener('click', ()=> handleDeletePatient(div))
  
    const editButton = document.createElement('button')
    editButton.className = 'single-patient-edit-button'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', ()=> hanldeEditPatient(patient))
  
    div.append(nameP, ageP, identificationNumberP, numberOfAppointmentsP, dateAppointmentP,fkSpecialtyIdP, deleteButton, editButton) 
    patientContainer.append(div)
}
function hanldeEditPatient(patient) {
    const nameInput = document.querySelector('.title-input');
    const ageInput = document.querySelector('.age-input');
    const identificationNumberInput = document.querySelector('.identificationNumber-input');
    const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input');
    const dateAppointmentInput = document.querySelector('.dateAppointment-input');
    const fkSpecialtyIdInput = document.querySelector('.fkSpecialtyId-input')
    
    const submitButton = document.querySelector('.patients-form-button')
    submitButton.classList.add('display_none')
  
    const editButton = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEditionPatient(patient, nameInput, ageInput, identificationNumberInput, numberOfAppointmentsInput, dateAppointmentInput))
  
    const formContainer = document.querySelector('.formPatient-container');
    formContainer?.append(editButton)
    
    nameInput.value = patient.name
    ageInput.value = patient.age;
    identificationNumberInput.value = patient.identificationNumber;
    numberOfAppointmentsInput.value = patient.numberOfAppointments;
    dateAppointmentInput.value = patient.dateAppointment;
    fkSpecialtyIdInput.value = patient.fkSpecialtyId;
}
function executeEditionPatient(specialistPatient, name, physician) {
   
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
            statePatient = newState;
          
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
function handleDeletePatient(div) {
    const id = div.classList[1].split('-')[1]
    deletePatient(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newState = state.filter(patient => patient.id !== parseInt(id))
        statePatient = newState
        }
    });
}
function recreatePatients(patient) {
    patient.forEach(patient => createPatient(patient));
}

