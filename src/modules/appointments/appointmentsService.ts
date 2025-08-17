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
    let responsePayload: Appointment[];
    
    const isdatetimeFromValid = isValidISODate(params.datetimeFrom);

    if(!isdatetimeFromValid) {
      next(new HttpError({
        message: "Invalid datetime. Please use ISO format.",
        statusCode: 400,
      }))
    }
    
    if(datetimeTo){
      if(!isValidISODate(params.datetimeTo)){
        next(new HttpError({
            message: "Invalid datetime. Please use ISO format.",
            statusCode: 400,
          }));
        return;
      }

      const datetimeFromDate: Date = new Date(datetimeFrom);
      const datetimeToDate: Date = new Date(datetimeTo);

      if(!isFromBeforeTo(datetimeFromDate, datetimeToDate)
        ){
          next(new HttpError({
            message: "Invalid datetime. datetimeFrom should be before datetimeTo.",
            statusCode: 400,
          }));
          return;
      }

     responsePayload = await repository.getListByDatetimeRange(datetimeFromDate, datetimeToDate);

    
    } else{
       const datetimeFromDate: Date = new Date(datetimeFrom);
      responsePayload = await repository.getListByDatetimeFrom(datetimeFromDate);
    }
      
   
    response.status(200);
    response.json(responsePayload);
  };

  return {
    getAppointmentsList
}

}

export default appointmentsService;
