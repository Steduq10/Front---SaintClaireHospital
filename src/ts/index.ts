import { skipPartiallyEmittedExpressions } from "../../node_modules/typescript/lib/typescript.js";
import { getAllSpecialistPatient, postSpecialistPatient, deleteSpecialist, putSpecialist} from "./actions.js";

const form: HTMLFormElement |null = 
document.querySelector('.specialtiesPatients-form');

/*class Patient{
  id:number|null
  age:number
  identificationNumber:number
  numberOfAppointments:number
  dateAppointment:string

  constructor(id:number|null, age:number, identificationNumber:number, numberOfAppointments:number, dateAppointment:string){
    this.id = id;
    this.age = age;
    this.identificationNumber= identificationNumber;
    this.numberOfAppointments= numberOfAppointments;
    this.dateAppointment = dateAppointment;
  }

}*/

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
//let patientList:Patient[]=[]

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
        
      }
    })
  }


  
  function recreateNotes(specialistPatient:SpecialistPatient[]){
    specialistPatient.forEach(specialistPatient => createSpecialistPatient(specialistPatient))
  }
  
  