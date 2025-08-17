import { Clinician, ClinicianRepository } from "../types/clinicianTypes";
import {clinicians} from "./inMemoryData.js";

const cliniciansInMemoryRepository : ClinicianRepository = {

    getById(id: number): Promise<Clinician | null> {
        let response: Clinician | null = null;

        if (clinicians[id]) {
            const { recordId, firstName, lastName, speciality } = clinicians[id];
            response = { id: recordId, firstName, lastName, speciality };
        }

        return Promise.resolve(response);
    }
}

export default cliniciansInMemoryRepository;