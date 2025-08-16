import type { Router } from "express";
import { getAppointmentsList } from "./appointmentsService.js";

const getAppointmentsRoutes = (router: Router) =>  {
  
  router.post("/", getAppointmentsList);

  return router;
}

export default getAppointmentsRoutes;
