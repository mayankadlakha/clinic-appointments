import { NextFunction, Request, Response } from "express";
import { Appointment, AppointmentRepository, CreateAppointmentRequest } from "../../types/appointmentTypes.js";
import { PatientRepository } from "../../types/patientTypes.js";
import { ClinicianRepository } from "../../types/clinicianTypes.js";
import { isFromBeforeTo, isValidISODate } from "../../common/datetimeValidator.js";
import { HttpError } from "../../common/errors.js";
import Clock from "../../common/clock.js";




interface AppointmentsQuery {
  datetimeFrom: string;
  datetimeTo: string;
}


const appointmentsService = (
    appointmentsRepository: AppointmentRepository, 
    cliniciansRepository: ClinicianRepository, 
    patientsRepository: PatientRepository,
    clock: Clock,
  ) => 
  {

  const getAppointmentsList = async (request: Request<{}, {}, {}, AppointmentsQuery>, response: Response, next: NextFunction) => {
    const params = request.query;
    const datetimeFrom: string = params.datetimeFrom || clock.now().toISOString();
    const datetimeTo: string | undefined = params.datetimeTo;
    let responsePayload: Appointment[] = [];
    
    // Given date range is provided
    if(datetimeTo){
      if(isValidISODate(datetimeTo) 
        && isValidISODate(datetimeFrom) 
        && isFromBeforeTo(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo))){
        
        responsePayload = await appointmentsRepository.getListByDatetimeRange(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo));
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
      
      responsePayload = await appointmentsRepository.getListByDatetimeFrom(datetimeFromDate);
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

    const createAppointment = async (request: Request, response: Response, next: NextFunction) => {
      const {clinicianId, patientId, datetimeFrom, datetimeTo, } = request.body as CreateAppointmentRequest;

      // Validate required fields
      if(typeof clinicianId !== "number" || clinicianId < 0 || typeof patientId !== "number" || patientId < 0 || !datetimeFrom || !datetimeTo){
        next(new HttpError({
          message: "Invalid request body. Please make sure clinicianId, patientId, datetimeFrom, datetimeTo are provided.",
          statusCode: 400,
        }));
        return;
      }

      // Validate dates are ISO
      if(!isValidISODate(datetimeFrom) || !isValidISODate(datetimeTo)){
        next(new HttpError({
          message: "Invalid datetime. Please use ISO 8601 format.",
          statusCode: 400,
        }));
        return;
      }

      // Validate date range
      if(!isFromBeforeTo(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo))){
        next(new HttpError({
          message: "Invalid datetime. Please use ISO format and ensure datetimeFrom is before datetimeTo",
          statusCode: 400,
        }));
        return;
      }

      /* Validate business logic */
      // Validate appointment is not in the past
      console.log("Current server time:", clock.now());
      console.log("datetimeFrom:", clock.createDatetime(datetimeFrom));
      if(clock.createDatetime(datetimeFrom) < clock.now()){
        next(new HttpError({
          message: "Invalid datetime. Appointment datetime cannot be in the past.",
          statusCode: 400,
        }));
        return;
      }

      // Validate clinician and patient exist
      const clinician = await cliniciansRepository.getById(clinicianId);
      const patient = await patientsRepository.getById(patientId);

      if (!clinician || !patient) {
        next(new HttpError({
          message: "Patient or Clinician not found. Please ensure that clinicianId and patientId are valid.",
          statusCode: 404,
        }));
        return;
      }

      // Validate there is no overlapping appointment
      const appointments = await appointmentsRepository.getListByDatetimeRangeAndClinicianId(clock.createDatetime(datetimeFrom), clock.createDatetime(datetimeTo), clinicianId);
      if(appointments.length !== 0){
        next(new HttpError({
          message: "This appointment time is not available for this clinician. Please choose another time or clinician.",
          statusCode: 409,
        }));
        return;
      }

      // Create appointment
      const newAppointmentId = await appointmentsRepository.createAppointment(
        clinician,
        patient,
        clock.createDatetime(datetimeFrom),
        clock.createDatetime(datetimeTo),
      );

      response.status(201);
      response.json({ id: newAppointmentId, clinician, patient, datetimeFrom: clock.createDatetime(datetimeFrom), datetimeTo: clock.createDatetime(datetimeTo) });
    };

  return {
    getAppointmentsList,
    createAppointment
}

}

export default appointmentsService;
