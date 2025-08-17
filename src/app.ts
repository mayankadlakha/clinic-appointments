import express, { Application, Router } from "express";
import getAppointmentsRoutes from "./modules/appointments/appointmentsRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import routeNotFoundMiddleware from "./middlewares/routeNotFoundMiddleware.js";
import { RepositoryType } from "./types/commonTypes.js";


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const repositoryType = <RepositoryType> process.env.REPOSITORY_TYPE || "InMemoryRepository";


//Setup Router with module routes
const router = Router();
const {default: repository}  = await import(`./modules/appointments/appointments${repositoryType}.js`);

app.use("/appointments", getAppointmentsRoutes(router, repository));

// Middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


