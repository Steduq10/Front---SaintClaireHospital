import { getAllPatient, postPatient, deletePatient, putPatient} from "./actionPatient";

const form: HTMLFormElement |null = 
document.querySelector('.specialtiesPatients-form');


export interface Patient{
    id:number|null
    name:string
    age:string
    identificationNumber:string
    numberOfAppointments:string
    dateAppointment:string
    fkSpecialtyId: string
}

getAllPatient().then(patient => {
  state = patient
  recreatePatient(patient);
})

let state:Patient[] = []


form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const nameInput = document.querySelector('.name-input') as HTMLInputElement;
  const ageInput = document.querySelector('.age-input') as HTMLInputElement;
  const identificationNumberInput = document.querySelector('.identificationNumber-input') as HTMLInputElement;
  const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input') as HTMLInputElement;
  const dateAppointmentInput = document.querySelector('.dayAppointment-input') as HTMLInputElement;
  const fkSpecialtyIdInput = document.querySelector('.fkSpecialtyId-input') as HTMLInputElement;
  
  if(nameInput.value&&identificationNumberInput.value&&ageInput.value&&numberOfAppointmentsInput.value&&dateAppointmentInput.value&&fkSpecialtyIdInput.value){
    
    const newPatient: Patient = {
      id: null,
      name: nameInput.value,
      age: ageInput.value,
      identificationNumber: identificationNumberInput.value,
      numberOfAppointments: numberOfAppointmentsInput.value,
      dateAppointment: dateAppointmentInput.value,
      fkSpecialtyId: fkSpecialtyIdInput.value
      
      
    }
    

    postPatient(newPatient).then(
      response => {
        if(response.status === 200){
          state.push(newPatient)

          createPatient(newPatient);  
          nameInput.value = '';
          ageInput.value = '';
          identificationNumberInput.value = '';
          numberOfAppointmentsInput.value = '';
          dateAppointmentInput.value = '';
          fkSpecialtyIdInput.value = '';
        }
      }
    )
  }
}


function createPatient(patient:Patient){
    const patientContainer = document.querySelector('.patient-container') as HTMLDivElement
  
    const div:HTMLDivElement = document.createElement('div');
    div.className = 'single-patient-container'
    div.classList.add(`patient-${patient.id}`)
    
    const nameP:HTMLParagraphElement = document.createElement('p');
    nameP.className = `single-patient-name-${patient.id}`
    nameP.innerText = patient.name
    
    const ageP:HTMLParagraphElement = document.createElement('p')
    ageP.className = `single-patient-physician-${patient.id}`
    ageP.innerText = patient.age
    
    const identificationNumberP:HTMLParagraphElement = document.createElement('p')
    identificationNumberP.className = `single-patient-physician-${patient.id}`
    identificationNumberP.innerText = patient.identificationNumber
    
    const numberOfAppointmentsP:HTMLParagraphElement = document.createElement('p')
    numberOfAppointmentsP.className = `single-patient-physician-${patient.id}`
    numberOfAppointmentsP.innerText = patient.numberOfAppointments

    const dateAppointmentP:HTMLParagraphElement = document.createElement('p')
    dateAppointmentP.className = `single-patient-physician-${patient.id}`
    dateAppointmentP.innerText = patient.dateAppointment

    const fkSpecialtyIdP:HTMLParagraphElement = document.createElement('p')
    fkSpecialtyIdP.className = `single-fkSpecialtyId-physician-${patient.id}`
    fkSpecialtyIdP.innerText = patient.fkSpecialtyId
  
    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-patient-delete-button'
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', ()=> handleDelete(div))
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-patient-edit-button'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', ()=> hanldeEdit(patient))
  
    div.append(nameP, ageP, identificationNumberP, numberOfAppointmentsP, dateAppointmentP,fkSpecialtyIdP, deleteButton, editButton) 
    patientContainer.append(div)
  }
  
  function hanldeEdit(patient:Patient){
    const nameInput = document.querySelector('.title-input') as HTMLInputElement;
    const ageInput = document.querySelector('.age-input') as HTMLInputElement;
    const identificationNumberInput = document.querySelector('.identificationNumber-input') as HTMLInputElement;
    const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input') as HTMLInputElement;
    const dateAppointmentInput = document.querySelector('.dateAppointment-input') as HTMLInputElement;
    const fkSpecialtyIdInput = document.querySelector('.fkSpecialtyId-input') as HTMLInputElement;
    
    const submitButton = document.querySelector('.specialist-form-button') as HTMLButtonElement
    submitButton.classList.add('display_none')
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(patient, nameInput, ageInput, identificationNumberInput, numberOfAppointmentsInput, dateAppointmentInput, fkSpecialtyIdInput))
  
    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)
    
    nameInput.value = patient.name
    ageInput.value = patient.age;
    identificationNumberInput.value = patient.identificationNumber;
    numberOfAppointmentsInput.value = patient.numberOfAppointments;
    dateAppointmentInput.value = patient.dateAppointment;
    fkSpecialtyIdInput.value = patient.fkSpecialtyId;
  }
  
  function executeEdition(patient:Patient, name:HTMLInputElement, age:HTMLInputElement, identificationNumber:HTMLInputElement, numberOfAppointments:HTMLInputElement, dateAppointment:HTMLInputElement, fkSpecialtyId:HTMLInputElement){
  

  
    const patientsEdited:Patient = {
      id:patient.id,
      name:name.value,
      age: age.value,
      identificationNumber: identificationNumber.value,
      numberOfAppointments: numberOfAppointments.value,
      dateAppointment: dateAppointment.value,
      fkSpecialtyId: fkSpecialtyId.value
      
    }
  
    putPatient(patientsEdited).then(response => {
      if(response.status === 200){
        const newState:Patient[] = state.map(specialistPatient => specialistPatient.id === patientsEdited.id?patientsEdited:patient)
        state = newState;
      
        const pName = document.querySelector(`.single-patient-name-${patient.id}`) as HTMLHeadingElement
        pName.innerText = patientsEdited.name
        const pAge = document.querySelector(`.single-patient-age-${patient.id}`) as HTMLParagraphElement
        pAge.innerText = patientsEdited.age
        const pIdentificationNumber = document.querySelector(`.single-patient-identification-${patient.id}`) as HTMLParagraphElement
        pIdentificationNumber.innerText = patientsEdited.identificationNumber
        const pNumberOfAppointments = document.querySelector(`.single-patient-approintments-${patient.id}`) as HTMLParagraphElement
        pNumberOfAppointments.innerText = patientsEdited.numberOfAppointments
        const pDateAppointment = document.querySelector(`.single-patient-date-${patient.id}`) as HTMLParagraphElement
        pDateAppointment.innerText = patientsEdited.dateAppointment
        const pFkSpecialtyId = document.querySelector(`.single-patient-fkSpecialtyId-${patient.id}`) as HTMLParagraphElement
        pFkSpecialtyId.innerText = patientsEdited.fkSpecialtyId
        
        name.value = ''
        age.value = ''
        identificationNumber.value = '',
        numberOfAppointments.value = '',
        dateAppointment.value = '',
        fkSpecialtyId.value = ''


        const submitButton = document.querySelector('.patients-form-button') as HTMLButtonElement
        submitButton.classList.remove('display_none')
      
        const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement
      
        editButton.remove()
      }
    })
  
    
  
  }
  
  function handleDelete(div:HTMLDivElement){
    const id:string = div.classList[1].split('-')[1]
    deletePatient(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newState = state.filter(patient => patient.id !== parseInt(id))
        state = newState
      }
    })
  }
  
  function recreatePatient(patient:Patient[]){
    patient.forEach(patient => createPatient(patient))
  }
  
  