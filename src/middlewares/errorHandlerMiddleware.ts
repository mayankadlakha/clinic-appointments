import { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/errors.js";

const  errorHandlerMiddleware = (err: HttpError, request: Request, response: Response, next: NextFunction) => {
    response.status(err?.statusCode || 500);
    response.json(err?.message || "Unknown Error.");
}

export default errorHandlerMiddleware;