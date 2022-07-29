import { Patient } from "./index";

export async function getAllPatient() {
  const response:Response = await fetch('http://localhost:8081/hospital/')

  const data:Patient[] = await response.json()

  return data
} 

export async function postPatient(patient:Patient){
  const response:Response = await fetch('http://localhost:8081/hospital/create/specialty', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(patient)
  })

  return response;
}

export async function deletePatient(id:string){
  const response:Response = await fetch(`http://localhost:8081/hospital/delete/specialty`, 
  {
    method: 'DELETE'
  })

  return response;
}

export async function putPatient(patient:Patient){
  const response:Response = await fetch('http://localhost:8081/hospital/update/specialty', 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(patient)
  })

  return response;
}