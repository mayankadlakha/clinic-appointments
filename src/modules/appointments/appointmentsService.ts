import { NextFunction, Request, Response } from "express";
import { Appointment, AppointmentRepository, CreateAppointmentRequest } from "../../types/appointmentTypes.js";
import { PatientRepository } from "../../types/patientTypes.js";
import { ClinicianRepository } from "../../types/clinicianTypes.js";
import { isFromBeforeTo, isValidISODate } from "../../common/datetimeValidator";
import { HttpError } from "../../common/errors";




interface AppointmentsQuery {
  datetimeFrom: string;
  datetimeTo: string;
}


const appointmentsService = (
    appointmentsRepository: AppointmentRepository, 
    cliniciansRepository: ClinicianRepository, 
    patientsRepository: PatientRepository
  ) => 
  {

  const getAppointmentsList = async (request: Request<{}, {}, {}, AppointmentsQuery>, response: Response, next: NextFunction) => {
    const params = request.query;
    const datetimeFrom: string = params.datetimeFrom || new Date().toISOString();
    const datetimeTo: string | undefined = params.datetimeTo;
    let responsePayload: Appointment[] = [];
    
    // Given date range is provided
    if(datetimeTo){
      if(isValidISODate(datetimeTo) 
        && isValidISODate(datetimeFrom) 
        && isFromBeforeTo(new Date(datetimeFrom), new Date(datetimeTo))){
        
        responsePayload = await appointmentsRepository.getListByDatetimeRange(new Date(datetimeFrom), new Date(datetimeTo));
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
      const datetimeFromDate: Date = new Date(datetimeFrom);
      
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
      if(isNaN(Number(clinicianId)) || Number(clinicianId) < 0 || isNaN(Number(patientId)) || Number(patientId) < 0 || !datetimeFrom || !datetimeTo){
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
      if(!isFromBeforeTo(new Date(datetimeFrom), new Date(datetimeTo))){
        next(new HttpError({
          message: "Invalid datetime. Please use ISO format and ensure datetimeFrom is before datetimeTo",
          statusCode: 400,
        }));
        return;
      }

      /* Validate business logic */
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
      const appointments = await appointmentsRepository.getListByDatetimeRangeAndClinicianId(new Date(datetimeFrom), new Date(datetimeTo), clinicianId);
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
        new Date(datetimeFrom),
        new Date(datetimeTo),
      );

      response.status(201);
      response.json({ id: newAppointmentId, clinician, patient, datetimeFrom: new Date(datetimeFrom), datetimeTo: new Date(datetimeTo) });
    };

  return {
    getAppointmentsList,
    createAppointment
}

}

export default appointmentsService;
