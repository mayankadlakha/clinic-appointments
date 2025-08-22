import { Clinician } from "./clinicianTypes";
import { Patient } from "./patientTypes";

// DTOs
export type CreateAppointmentRequest = {
    clinicianId: number;
    patientId: number;
    datetimeFrom: string;
    datetimeTo: string;
}


// API Models
export interface Appointment {
    id: number,
    clinician: Clinician;
    patient: Patient;
    datetimeFrom: Date;
    datetimeTo: Date; 
}

export type AppointmentStatus = "scheduled" | "completed" | "cancelled"
export type AppointmentType = "initial" | "subsequent" | "long"




// Repository Layer Entities
export interface AppointmentRepository {
    getListByDatetimeFrom(datetimeFrom: Date): Promise<Appointment[]>;
    getListByDatetimeRange(datetimeFrom: Date, datetimeTo: Date): Promise<Appointment[]>;
    getListByDatetimeRangeAndClinicianId(datetimeFrom: Date, datetimeTo: Date, clinicianId: number): Promise<Appointment[]>;
    createAppointment(clinician: Clinician, patient: Patient, datetimeFrom: Date, datetimeTo: Date): Promise<number>;
}

export type AppointmentEntity = {
    recordId: number,
    clinicianId: number;
    patientId: number;
    datetimeFrom: Date;
    datetimeTo: Date;
}

export type AppointmentEntityCollection = Record<number, AppointmentEntity>;