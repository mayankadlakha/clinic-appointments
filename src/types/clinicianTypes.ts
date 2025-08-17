// API Models
export type Clinician = {
    id: number,
    firstName: string,
    lastName: string,
    speciality: string,
}

// Repository Layer Entities
export interface ClinicianRepository {
    getById(id: number): Promise<Clinician | null>;
}

export type ClinicianEntity = {
    recordId: number,
    firstName: string,
    lastName: string,
    speciality: string
}

export type ClinicianEntityCollection = Record<number, ClinicianEntity>;