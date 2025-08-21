import type { Router } from "express";
import { ClinicianRepository } from "../../types/clinicianTypes.js";
import { PatientRepository } from "../../types/patientTypes.js";
import { AppointmentRepository } from "../../types/appointmentTypes.js";
import cliniciansService from "./cliniciansService.js";
import Clock from "../../common/clock.js";

const getCliniciansRoutes = (router: Router, appointmentsRepository: AppointmentRepository, cliniciansRepository: ClinicianRepository, patientsRepository: PatientRepository, clock: Clock) =>  {

  const {getAppointmentsListByClinicianId} = cliniciansService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);

  router.get("/:id/appointments", getAppointmentsListByClinicianId);

  return router;
}

export default getCliniciansRoutes;
