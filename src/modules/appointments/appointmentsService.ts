import { NextFunction, Request, Response } from "express";
import { isValidISODate, isFromBeforeTo } from "./datetimeValidator.js";
import {HttpError} from "../../middlewares/errorHandlerMiddleware.js";
import { Appointment, AppointmentRepository } from "../../types/appointmentModel.js";




interface AppointmentsQuery {
  datetimeFrom: string;
  datetimeTo: string;
}


const appointmentsService = (repository: AppointmentRepository) => {

  const getAppointmentsList = async (request: Request<{}, {}, {}, AppointmentsQuery>, response: Response, next: NextFunction) => {
    const params = request.query;
    const datetimeFrom: string = params.datetimeFrom || new Date().toISOString();
    const datetimeTo: string | undefined = params.datetimeTo;
    let responsePayload: Appointment[] = [];
    
    // Date range provided
    if(datetimeTo){
      if(isValidISODate(datetimeTo) 
        && isValidISODate(datetimeFrom) 
        && isFromBeforeTo(new Date(datetimeFrom), new Date(datetimeTo))){
        
        responsePayload = await repository.getListByDatetimeRange(new Date(datetimeFrom), new Date(datetimeTo));
        response.status(200);
        response.json(responsePayload);
        return;
      } else{
        next(new HttpError({
          message: "Invalid datetime. Please use ISO format and ensure datetimeFrom is before datetimeTo",
          statusCode: 400,
        }));
      }    
    } 

    // Only datetimeFrom provided
    if(isValidISODate(datetimeFrom)){
      const datetimeFromDate: Date = new Date(datetimeFrom);
      
      responsePayload = await repository.getListByDatetimeFrom(datetimeFromDate);
      response.status(200);
      response.json(responsePayload);
      return;
    } else{
      next(new HttpError({
        message: "Invalid datetime. Please use ISO format.",
        statusCode: 400,
        }));
    };
  };

  return {
    getAppointmentsList
}

}

export default appointmentsService;
