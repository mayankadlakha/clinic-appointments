

// API Models
export type Patient = {
    id: number,
    firstName: string,
    lastName: string,
}



// Repository Layer Entities
export interface PatientRepository {
    getById(id: number): Promise<Patient | null>;
}

export type PatientEntity = {
    recordId: number,
    firstName: string,
    lastName: string,
}

export type PatientEntityCollection = Record<number, PatientEntity>;
