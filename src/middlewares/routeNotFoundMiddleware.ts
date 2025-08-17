import { NextFunction, Request, Response } from "express";
import { HttpError } from "./errorHandlerMiddleware.js";

const  routeNotFoundMiddleware = (request: Request, response: Response, next: NextFunction) => {
  next(new HttpError({
    statusCode: 404, 
    message: 'Not Found. The route you are looking for does not exist.',
}));
}

export default routeNotFoundMiddleware;