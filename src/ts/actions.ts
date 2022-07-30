import { SpecialistPatient } from "./index.js";

export async function getAllSpecialistPatient() {
  const response:Response = await fetch('http://localhost:8081/hospital/')

  const data:SpecialistPatient[] = await response.json()

  return data
} 

export async function postSpecialistPatient(specialistPatient:SpecialistPatient){
  const response:Response = await fetch('http://localhost:8081/hospital/create/specialty', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(specialistPatient)
  })

  return response;
}

export async function deleteSpecialist(specialistPatient:SpecialistPatient){
  const response:Response = await fetch('http://localhost:8081/hospital/delete/specialty', 
  {
    method: 'DELETE'
  })

  return response;
}

export async function putSpecialist(specialistPatient:SpecialistPatient){
  const response:Response = await fetch('http://localhost:8081/hospital/update/specialty', 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(specialistPatient)
  })

  return response;
}