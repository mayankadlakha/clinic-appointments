import { Appointment, AppointmentRepository } from "../types/appointmentTypes.js";
import { Clinician } from "../types/clinicianTypes.js";
import { Patient } from "../types/patientTypes.js";
import {appointments, clinicians, patients} from "./inMemoryData.js";

const appointmentsInMemoryRepository : AppointmentRepository = {
    async getListByDatetimeFrom(datetimeFrom: Date): Promise<Appointment[]> {
        const response: Appointment[] = [];

        for(const [_, entry] of Object.entries(appointments)) {
            const entryDatetimeFrom = new Date(entry.datetimeFrom);
            const entryDatetimeTo = new Date(entry.datetimeTo);

            const isAppointmentStartingWithinRange = entryDatetimeFrom >= datetimeFrom;
          
            if(isAppointmentStartingWithinRange){
                // Using non-null assertion because we are confident that the clinician exists
                const clinician = clinicians[Number(entry.clinicianId)]!;
                const patient = patients[Number(entry.patientId)]!;

                response.push({
                    id: entry.recordId,
                    clinician: {
                        id: clinician.recordId,
                        firstName: clinician.firstName,
                        lastName: clinician.lastName,
                        speciality: clinician.speciality,
                    },
                    patient: {
                        id: patient.recordId,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                    },
                    datetimeFrom: entryDatetimeFrom,
                    datetimeTo: entryDatetimeTo,
                });
            }
         }

         return Promise.resolve(response);
    },

    async getListByDatetimeRange(datetimeFrom: Date, datetimeTo: Date): Promise<Appointment[]> {
        const response: Appointment[] = [];

        for(const [_, entry] of Object.entries(appointments)) {
            const entryDatetimeFrom = new Date(entry.datetimeFrom);
            const entryDatetimeTo = new Date(entry.datetimeTo);

            // Check if the target datetime is within this entry's from and to datetime
            // Note that touching the boundaries (i.e. start on entryDatetimeTo and end on entryDatetimeFrom) is not considered an overlap
            const isAppointmentStartingWithinRange = datetimeFrom >= entryDatetimeFrom && datetimeFrom < entryDatetimeTo;
            const isAppointmentEndingWithinRange = datetimeTo > entryDatetimeFrom && datetimeTo <= entryDatetimeTo;

            if(isAppointmentStartingWithinRange || isAppointmentEndingWithinRange){
                // Using non-null assertion because we are confident that the clinician exists
                const clinician = clinicians[Number(entry.clinicianId)]!;
                const patient = patients[Number(entry.patientId)]!;

                response.push({
                    id: entry.recordId,
                    clinician: {
                        id: clinician.recordId,
                        firstName: clinician.firstName,
                        lastName: clinician.lastName,
                        speciality: clinician.speciality,
                    },
                    patient: {
                        id: patient.recordId,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                    },
                    datetimeFrom: entryDatetimeFrom,
                    datetimeTo: entryDatetimeTo,
                });
            }
        }

        return Promise.resolve(response);
    },

    async getListByDatetimeRangeAndClinicianId(datetimeFrom: Date, datetimeTo: Date, clinicianId: number): Promise<Appointment[]> {
        const response: Appointment[] = [];

        const appointments = await this.getListByDatetimeRange(datetimeFrom, datetimeTo);
        appointments.forEach(appointment => {
            if (appointment.clinician.id === clinicianId) {
                response.push(appointment);
            }
        });

        return Promise.resolve(response);
    },

    async createAppointment(clinician: Clinician, patient: Patient, datetimeFrom: Date, datetimeTo: Date): Promise<number> {
        let nextRecordId: number;
        // If appointments exist, use the highest existing recordId to generate the next one, else use 0
        if( Object.keys(appointments).length > 0){
            const existingAppointmentKeys = Object.keys(appointments).map(Number);
            nextRecordId = Math.max(...existingAppointmentKeys) + 1;
        } else {
            nextRecordId = 0;
        }
        
        appointments[nextRecordId] = {
            recordId: nextRecordId,
            clinicianId: clinician.id,
            patientId: patient.id,
            datetimeFrom: datetimeFrom,
            datetimeTo: datetimeTo,
        };
        
        return Promise.resolve(nextRecordId);
    }
}

export default appointmentsInMemoryRepository;