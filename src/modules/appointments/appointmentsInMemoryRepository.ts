import { Appointment, AppointmentRepository, AppointmentStatus } from "../../types/appointmentModel";
import appointments from "./appointments.json" assert { type: "json" };

const appointmentsInMemoryRepository : AppointmentRepository = {
    getList(): Promise<Appointment[]> {
        throw new Error("Method not implemented.");
    },
    
    getListByDatetimeFrom(datetimeFrom: Date): Promise<Appointment[]> {
        const response: Appointment[] = [];

        appointments.forEach((entry) => {
            const entryDatetimeFrom = new Date(entry.datetimeFrom);
            const entryDatetimeTo = new Date(entry.datetimeTo);

            const isAppointmentStartingWithinRange = entryDatetimeFrom >= datetimeFrom;
          
            if(isAppointmentStartingWithinRange){
                response.push({
                    clinician: {
                        id: Number(entry.clinician.id),
                        firstName: entry.clinician.firstName,
                        lastName: entry.clinician.lastName,
                        speciality: entry.clinician.speciality,
                    },
                    datetimeFrom: entryDatetimeFrom,
                    datetimeTo: entryDatetimeTo,
                    status: <AppointmentStatus> entry.status
                });
            }
         })

         return Promise.resolve(response);
    },

    getListByDatetimeRange(datetimeFrom: Date, datetimeTo: Date): Promise<Appointment[]> {
        const response: Appointment[] = [];

        appointments.forEach((entry) => {
            const entryDatetimeFrom = new Date(entry.datetimeFrom);
            const entryDatetimeTo = new Date(entry.datetimeTo);

            const isAppointmentStartingWithinRange = entryDatetimeFrom >= datetimeFrom && entryDatetimeFrom <= datetimeTo;
          
            if(isAppointmentStartingWithinRange){
                response.push({
                    clinician: {
                        id: Number(entry.clinician.id),
                        firstName: entry.clinician.firstName,
                        lastName: entry.clinician.lastName,
                        speciality: entry.clinician.speciality,
                    },
                    datetimeFrom: entryDatetimeFrom,
                    datetimeTo: entryDatetimeTo,
                    status: <AppointmentStatus> entry.status
                });
            }
         })

         return Promise.resolve(response);
    }
}

export default appointmentsInMemoryRepository;