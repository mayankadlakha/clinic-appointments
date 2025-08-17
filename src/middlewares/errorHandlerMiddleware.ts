import { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  statusCode: number;
  
  constructor({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: number;
  }) {
    super(message);
    this.statusCode = statusCode;
  }
}

const  errorHandlerMiddleware = (err: HttpError, request: Request, response: Response, next: NextFunction) => {
    response.status(err?.statusCode || 500);
    response.json(err?.message || "Unknown Error.");
}

export default errorHandlerMiddleware;