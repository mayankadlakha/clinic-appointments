import { NextFunction, Request, Response } from "express";
import { isValidISODate, isFromBeforeTo } from "../../common/datetimeValidator.js";
import { Appointment, AppointmentRepository } from "../../types/appointmentTypes.js";
import { PatientRepository } from "../../types/patientTypes.js";
import { ClinicianRepository } from "../../types/clinicianTypes.js";
import { HttpError } from "../../common/errors.js";
import Clock from "../../common/clock.js";


const MAX_JS_DATE_MS = 8640000000000000;

interface AppointmentsQuery {
  datetimeFrom: string;
  datetimeTo: string;
}


const cliniciansService = (
    appointmentsRepository: AppointmentRepository, 
    cliniciansRepository: ClinicianRepository, 
    patientsRepository: PatientRepository,
    clock: Clock
  ) => 
  {

  const getAppointmentsListByClinicianId = async (request: Request<{id: string}, {}, {}, AppointmentsQuery>, response: Response, next: NextFunction) => {
    const clinicianId = Number(request.params.id);
    const params = request.query;
    const datetimeFrom: string = params.datetimeFrom || clock.now().toISOString();
    const datetimeTo: string | undefined = params.datetimeTo;
    let responsePayload: Appointment[] = [];

     /* Validations*/
    // Validate clinician exists
    if (Number.isNaN(clinicianId) || clinicianId < 0) {
      next(new HttpError({
        message: "Invalid clinicianId. Please provide a valid number.",
        statusCode: 400,
      }));
      return;
    }

    const clinician = await cliniciansRepository.getById(clinicianId);

    if (!clinician) {
      next(new HttpError({
        message: "Clinician not found. Please ensure that clinicianId is valid.",
        statusCode: 404,
      }));
      return;
    }
  
    // Given date range is provided
    if(datetimeTo){
      if(isValidISODate(datetimeTo) 
        && isValidISODate(datetimeFrom) 
        && isFromBeforeTo(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo))){

        responsePayload = await appointmentsRepository.getListByDatetimeRangeAndClinicianId(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo), clinicianId);
        response.status(200);
        response.json(responsePayload);
        return;
      } else{
        next(new HttpError({
          message: "Invalid datetime. Please use ISO format and ensure datetimeFrom is before datetimeTo",
          statusCode: 400,
        }));
        return;
      }    
    } 

    // Given only datetimeFrom is provided
    if(isValidISODate(datetimeFrom)){
      const datetimeFromDate: Date = clock.createDatetime(datetimeFrom);

      responsePayload = await appointmentsRepository.getListByDatetimeRangeAndClinicianId(datetimeFromDate, clock.createDatetime(MAX_JS_DATE_MS), clinicianId);
      response.status(200);
      response.json(responsePayload);
      return;
    } else{
      next(new HttpError({
        message: "Invalid datetime. Please use ISO 8601 format.",
        statusCode: 400,
      }));
      return;
    };
  };

   

  return {
    getAppointmentsListByClinicianId
}

}

export default cliniciansService;
