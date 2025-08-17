import type { Router } from "express";
import appointmentsService from "./appointmentsService.js";
import { AppointmentRepository } from "../../types/appointmentTypes.js";
import { ClinicianRepository } from "../../types/clinicianTypes.js";
import { PatientRepository } from "../../types/patientTypes.js";

const getAppointmentsRoutes = (router: Router, appointmentsRepository: AppointmentRepository, cliniciansRepository: ClinicianRepository, patientsRepository: PatientRepository) =>  {

  const {getAppointmentsList, createAppointment} = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository);

  router.get("/", getAppointmentsList);
  router.post("/", createAppointment);

  return router;
}

export default getAppointmentsRoutes;
