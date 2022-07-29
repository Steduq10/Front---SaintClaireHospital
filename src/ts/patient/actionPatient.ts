import { Patient } from "./indexPatient";

export async function getAllPatient() {
  const response:Response = await fetch('http://localhost:8081/hospital/patient')

  const data:Patient[] = await response.json()

  return data
} 

export async function postPatient(patient:Patient){
  const response:Response = await fetch('http://localhost:8081/hospital/create/patient', 
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
  const response:Response = await fetch(`http://localhost:8081/hospital/delete/patient${id}`, 
  {
    method: 'DELETE'
  })

  return response;
}

export async function putPatient(patient:Patient){
  const response:Response = await fetch('http://localhost:8081/hospital/update/patient', 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(patient)
  })

  return response;
}