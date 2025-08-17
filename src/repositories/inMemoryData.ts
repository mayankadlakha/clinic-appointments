import { AppointmentEntityCollection } from "../types/appointmentTypes";
import { ClinicianEntityCollection } from "../types/clinicianTypes";
import { PatientEntityCollection } from "../types/patientTypes";

export const appointments: AppointmentEntityCollection = {
  0: {
    recordId: 0,
    clinicianId: 0,
    patientId: 1,
    datetimeFrom: new Date("2025-08-16T14:30:00.000Z"),
    datetimeTo: new Date("2025-08-16T15:30:00.000Z"),
  },
  1: {
    recordId: 1,
    clinicianId: 1,
    patientId: 0,
    datetimeFrom: new Date("2025-08-16T16:00:00.000Z"),
    datetimeTo: new Date("2025-08-16T16:30:00.000Z"),
  },
  2: {
    recordId: 2,
    clinicianId: 0,
    patientId: 1,
    datetimeFrom: new Date("2025-08-16T16:15:00.000Z"),
    datetimeTo: new Date("2025-08-16T17:00:00.000Z"),
  }
};

export const clinicians: ClinicianEntityCollection = {
  0: {
    recordId: 0,
    firstName: "Immortan",
    lastName: "Joe",
    speciality: "Physiotherapist"
  },
  1: {
    recordId: 1,
    firstName: "Max",
    lastName: "Rockatansky",
    speciality: "Cardiologist"
  }
}

export const patients: PatientEntityCollection = {
  0: {
    recordId: 0,
    firstName: "Ian",
    lastName: "Kelson",
  },
  1: {
    recordId: 1,
    firstName: "Jimmy",
    lastName: "Ink",
  }
}
