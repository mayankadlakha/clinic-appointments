import express, { Application, Router } from "express";
import getAppointmentsRoutes from "./modules/appointments/appointmentsRouter.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Setup Router with module routes
const router = Router();
app.use("/appointments", getAppointmentsRoutes(router));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
