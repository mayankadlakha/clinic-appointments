export interface Appointment {
    clinician: Clinician;
    datetimeFrom: Date;
    datetimeTo: Date;
    status: AppointmentStatus;
    type: AppointmentType;

    patientId?: number;
    notes?: string;
}

export type AppointmentStatus = "available" | "booked" | "completed"
export type AppointmentType = "initial" | "subsequent" | "long"

export type Clinician = {
    id: number,
    firstName: string,
    lastName: string,
    speciality: string,
}