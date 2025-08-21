import express, { Application, Router } from "express";
import getAppointmentsRoutes from "./modules/appointments/appointmentsRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import routeNotFoundMiddleware from "./middlewares/routeNotFoundMiddleware.js";
import { RepositoryType } from "./types/commonTypes.js";
import getCliniciansRoutes from "./modules/clinicians/cliniciansRouter.js";
import Clock from "./common/clock.js";


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const repositoryType = <RepositoryType> process.env.REPOSITORY_TYPE || "InMemoryRepository";


//Setup Router with module routes
const router = Router();
const {default: appointmentsRepository}  = await import(`./repositories/appointments${repositoryType}.js`);
const {default: cliniciansRepository}  = await import(`./repositories/clinicians${repositoryType}.js`);
const {default: patientsRepository}  = await import(`./repositories/patients${repositoryType}.js`);
const clock = new Clock();

app.use("/appointments", getAppointmentsRoutes(router, appointmentsRepository, cliniciansRepository, patientsRepository, clock));
app.use("/clinicians", getCliniciansRoutes(router, appointmentsRepository, cliniciansRepository, patientsRepository, clock));

// Middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


