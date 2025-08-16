import { Request, Response } from "express";

export const getAppointmentsList = (req: Request, res: Response) => {
  res.json({ message: "Appointments List" });
};

