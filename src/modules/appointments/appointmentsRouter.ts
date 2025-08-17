import type { Router } from "express";
import appointmentsService from "./appointmentsService.js";
import { AppointmentRepository } from "../../types/appointmentModel.js";

const getAppointmentsRoutes = (router: Router, repository: AppointmentRepository) =>  {

  const {getAppointmentsList} = appointmentsService(repository);
  
  router.get("/", getAppointmentsList);

  return router;
}

export default getAppointmentsRoutes;
