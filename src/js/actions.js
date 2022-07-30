var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllSpecialistPatient() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/');
        const data = yield response.json();
        return data;
    });
}
export function postSpecialistPatient(specialistPatient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/create/specialty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialistPatient)
        });
        return response;
    });
}
export function deleteSpecialist(specialistPatient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/delete/specialty', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialistPatient)
        });
        return response;
    });
}
export function putSpecialist(specialistPatient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/update/specialty', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialistPatient)
        });
        return response;
    });
}

export function postPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/create/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}
export function deletePatient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:8081/hospital/delete/patient`, {
            method: 'DELETE'
        });
        return response;
    });
}
export function putPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8081/hospital/update/patient', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}

