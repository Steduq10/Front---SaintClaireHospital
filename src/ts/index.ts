
import { getAllSpecialistPatient, postSpecialistPatient, deleteSpecialist, putSpecialist} from "./actions.js";
import { postPatient, deletePatient, putPatient} from "./actionPatient.js";


const form: HTMLFormElement |null = 
document.querySelector('.specialtiesPatients-form');


export interface SpecialistPatient{
  id:number|null,
  name:string,
  physicianCharge:string,
  patients: []
}

getAllSpecialistPatient().then(specialistPatients => {
  state = specialistPatients
  recreateNotes(specialistPatients);
})

let state:SpecialistPatient[] = []
let patients:Patient[]=[]

function showSpecialistForm(){

}

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const nameInput = document.querySelector('.name-input') as HTMLInputElement;
  const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;
  
  if(nameInput.value&&physicianInput.value){
    
    const newSpecialistPatient: SpecialistPatient = {
      id: null,
      name: nameInput.value,
      physicianCharge: physicianInput.value,
      patients: []
    }
    

    postSpecialistPatient(newSpecialistPatient).then(
      response => {
        if(response.status === 200){
          state.push(newSpecialistPatient)

          createSpecialistPatient(newSpecialistPatient);  
          nameInput.value = '';
          physicianInput.value = '';
        }
      }
    )
  }
}


function createSpecialistPatient(specialistPatient:SpecialistPatient){
    const specialistContainer = document.querySelector('.specialist-container') as HTMLDivElement
  
    const div:HTMLDivElement = document.createElement('div');
    div.className = 'single-specialist-container'
    div.classList.add(`specialist-${specialistPatient.id}`)
    
    const nameP:HTMLHeadElement = document.createElement('h2');
    nameP.className = `single-specialist-name-${specialistPatient.id}`
    nameP.innerText = specialistPatient.name
    
    const physicianP:HTMLParagraphElement = document.createElement('p')
    physicianP.className = `single-specialist-physician-${specialistPatient.id}`
    physicianP.innerText = specialistPatient.physicianCharge
    
    /*const dateP:HTMLParagraphElement = document.createElement('p')
    dateP.className = `single-note-date-${note.id}`
    dateP.innerText = note.date*/
  
    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-specialist-delete-button'
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', ()=> handleDelete(specialistPatient))
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-note-edit-button'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', ()=> hanldeEdit(specialistPatient))
  
    div.append(nameP, physicianP, deleteButton, editButton) 
    specialistContainer.append(div)
  }
  
  function hanldeEdit(specialistPatient:SpecialistPatient){
    const nameInput = document.querySelector('.title-input') as HTMLInputElement;
    const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;
    const submitButton = document.querySelector('.specialist-form-button') as HTMLButtonElement
    submitButton.classList.add('display_none')
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(specialistPatient, nameInput, physicianInput))
  
    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)
    
    nameInput.value = specialistPatient.name
    physicianInput.value = specialistPatient.physicianCharge;
  }
  
  function executeEdition(specialistPatient:SpecialistPatient, name:HTMLInputElement, physician:HTMLInputElement){
  
    /*const date = new Date();
    date.setHours(date.getHours() - 5)*/
  
    const specialistEdited:SpecialistPatient = {
      id:specialistPatient.id,
      name:name.value,
      physicianCharge:physician.value,
      patients: specialistPatient.patients
      //date: date.toISOString()
    }
  
    putSpecialist(specialistEdited).then(response => {
      if(response.status === 200){
        const newState:SpecialistPatient[] = state.map(specialistPatient => specialistPatient.id === specialistEdited.id?specialistEdited:specialistPatient)
        state = newState;
      
        const h2Name = document.querySelector(`.single-specialist-name-${specialistPatient.id}`) as HTMLHeadingElement
        h2Name.innerText = specialistEdited.name
        const pPhysician = document.querySelector(`.single-note-reminder-${specialistPatient.id}`) as HTMLParagraphElement
        pPhysician.innerText = specialistEdited.physicianCharge
      
       /* const pDate = document.querySelector(`.single-note-date-${note.id}`) as HTMLParagraphElement
        pDate.innerText = noteEdited.date*/
        
        name.value = ''
        physician.value = ''
        const submitButton = document.querySelector('.specialist-form-button') as HTMLButtonElement
        submitButton.classList.remove('display_none')
      
        const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement
      
        editButton.remove()
      }
    })
  
    
  
  }
  
  /*function handleDelete(div:HTMLDivElement){
    const id:string = div.classList[1].split('-')[1]
    deleteSpecialist(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newState = state.filter(specialistPatient => specialistPatient.id !== parseInt(id))
        state = newState
      }
    })
  }*/
  function handleDelete(specialistPatient:SpecialistPatient){
   // const id:string = div.classList[1].split('-')[1]
    deleteSpecialist(specialistPatient).then(response => {
      const specialistPatientDiv = document.querySelector(`#speciality-${specialistPatient.id}`) as HTMLDivElement
      if(response.status === 200){
        
        specialistPatientDiv.remove()
        //const newState = state.filter(specialistPatient => specialistPatient.id !== parseInt(specialistPatient.id))
        //state = newState
        const newState:SpecialistPatient[] = state.map(specialistPatientDiv => specialistPatient.id === specialistPatientDiv.id?specialistPatient:specialistPatient)
        state = newState;
      }
    })
  }


  
  function recreateNotes(specialistPatient:SpecialistPatient[]){
    specialistPatient.forEach(specialistPatient => createSpecialistPatient(specialistPatient))
  }
  
  const formPatient: HTMLFormElement |null = 
document.querySelector('.patients-form');


export interface Patient{
    id:number|null
    name:string
    age: number
    identificationNumber: number
    numberOfAppointments:string
    dateAppointment:string
    fkSpecialtyId: string
}

/*getAllPatient().then(patient => {
  state = patient
  recreatePatient(patient);
})*/

let statePatient:Patient[] = []




formPatient?.addEventListener('submit', (e) => handleSubmitPatient(e))

function handleSubmitPatient(e:SubmitEvent){
  e.preventDefault()
  const nameInput = document.querySelector('.namePatient-input') as HTMLInputElement;
  const ageInput = document.querySelector('.agePatient-input') as HTMLInputElement;
  const identificationNumberInput = document.querySelector('.identificationNumber-input') as HTMLInputElement;
  const numberOfAppointmentsInput = document.querySelector('.numberOfAppointments-input') as HTMLInputElement;
  const dateAppointmentInput = document.querySelector('.dayAppointment-input') as HTMLInputElement;
  const fkSpecialtyIdInput = document.querySelector('.fkSpecialtyId-input') as HTMLInputElement;
  
  if(nameInput.value&&identificationNumberInput.value&&ageInput.value&&numberOfAppointmentsInput.value&&dateAppointmentInput.value&&fkSpecialtyIdInput.value){
    
    const newPatient: Patient = {
      id: null,
      name: nameInput.value,
      age: parseInt(ageInput.value),
      identificationNumber: parseInt(identificationNumberInput.value),
      numberOfAppointments: numberOfAppointmentsInput.value,
      dateAppointment: dateAppointmentInput.value,
      fkSpecialtyId: fkSpecialtyIdInput.value
      
      
    }

    let exist:boolean = false;
    patients?.forEach(patient =>{
      if (patient.identificationNumber === newPatient.identificationNumber){
        exist = true
      }
    })

    if(exist){
      alert("Patient exist")
      return;
    }
    

    postPatient(newPatient).then(
      response => {
        if(response.status === 200){
          patients.push(newPatient)

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
    const age = String(patient.age)
    ageP.innerText = age
    
    const identificationNumberP:HTMLParagraphElement = document.createElement('p')
    identificationNumberP.className = `single-patient-physician-${patient.id}`
    const identificationNumber = String(patient.identificationNumber)
    identificationNumberP.innerText = identificationNumber
    
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
    deleteButton.addEventListener('click', ()=> handleDeletePatient(div))
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-patient-edit-button'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', ()=> hanldeEditPatient(patient))
  
    div.append(nameP, ageP, identificationNumberP, numberOfAppointmentsP, dateAppointmentP,fkSpecialtyIdP, deleteButton, editButton) 
    patientContainer.append(div)
  }
  
  function hanldeEditPatient(patient:Patient){
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
    editButton.addEventListener('click', () => executeEditionPatient(patient, nameInput, ageInput, identificationNumberInput, numberOfAppointmentsInput, dateAppointmentInput, fkSpecialtyIdInput))
  
    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)
    
    nameInput.value = patient.name
    const age = String(patient.age)
    ageInput.value = age;
    const identificationNumber = String(patient.identificationNumber)
    identificationNumberInput.value = identificationNumber;
    numberOfAppointmentsInput.value = patient.numberOfAppointments;
    dateAppointmentInput.value = patient.dateAppointment;
    fkSpecialtyIdInput.value = patient.fkSpecialtyId;
  }
  
  function executeEditionPatient(patient:Patient, name:HTMLInputElement, age:HTMLInputElement, identificationNumber:HTMLInputElement, numberOfAppointments:HTMLInputElement, dateAppointment:HTMLInputElement, fkSpecialtyId:HTMLInputElement){
  

  
    const patientsEdited:Patient = {
      id:patient.id,
      name:name.value,
      age: parseInt(age.value),
      identificationNumber: parseInt(identificationNumber.value),
      numberOfAppointments: numberOfAppointments.value,
      dateAppointment: dateAppointment.value,
      fkSpecialtyId: fkSpecialtyId.value
      
    }
  
    putPatient(patientsEdited).then(response => {
      if(response.status === 200){
        const newState:Patient[] = state.map(specialistPatient => specialistPatient.id === patientsEdited.id?patientsEdited:patient)
        statePatient = newState;
      
        const pName = document.querySelector(`.single-patient-name-${patient.id}`) as HTMLHeadingElement
        pName.innerText = patientsEdited.name
        const pAge = document.querySelector(`.single-patient-age-${patient.id}`) as HTMLParagraphElement
        const age = String(patientsEdited.age)
        pAge.innerText = age
        const pIdentificationNumber = document.querySelector(`.single-patient-identification-${patient.id}`) as HTMLParagraphElement
        const identificationNumber = String(patientsEdited.identificationNumber)
        pIdentificationNumber.innerText = identificationNumber
        const pNumberOfAppointments = document.querySelector(`.single-patient-approintments-${patient.id}`) as HTMLParagraphElement
        pNumberOfAppointments.innerText = patientsEdited.numberOfAppointments
        const pDateAppointment = document.querySelector(`.single-patient-date-${patient.id}`) as HTMLParagraphElement
        pDateAppointment.innerText = patientsEdited.dateAppointment
        const pFkSpecialtyId = document.querySelector(`.single-patient-fkSpecialtyId-${patient.id}`) as HTMLParagraphElement
        pFkSpecialtyId.innerText = patientsEdited.fkSpecialtyId
        
        name.value = '',
        

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
  
  function handleDeletePatient(div:HTMLDivElement){
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
  
  