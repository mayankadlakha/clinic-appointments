import { Patient, PatientRepository } from "../types/patientTypes.js";
import {patients} from "./inMemoryData.js";

const patientsInMemoryRepository : PatientRepository = {

    getById(id: number): Promise<Patient | null> {
        let response: Patient | null = null;

        if (patients[id]) {
            const { recordId, firstName, lastName } = patients[id];
            response = { id: recordId, firstName, lastName };
        }

        return Promise.resolve(response);
    }
}

export default patientsInMemoryRepository;