import { AppointmentRepository } from "../../../types/appointmentTypes";
import { ClinicianRepository } from "../../../types/clinicianTypes";
import { PatientRepository } from "../../../types/patientTypes";
import appointmentsService from "../appointmentsService";


describe("appointmentsService", () => {
    describe("createAppointment", () => {
        it("given valid request body, creates appointment", async () => {
            const response = {
                status: jest.fn(),
                json: jest.fn(),
            } as any;
            const next = jest.fn();
            const mockedNewAppointmentId = 5;
            const appointmentsRepository: AppointmentRepository = {
                createAppointment: jest.fn().mockResolvedValue(mockedNewAppointmentId),
                getListByDatetimeRange: jest.fn(),
                getListByDatetimeFrom: jest.fn(),
                getListByDatetimeRangeAndClinicianId: jest.fn().mockResolvedValue([]),
            };
            const cliniciansRepository: ClinicianRepository = {
                getById: jest.fn().mockResolvedValue({ id: 10, firstName: "Sand", lastName: "Dune" }),
            };
            const patientsRepository: PatientRepository = {
                getById: jest.fn().mockResolvedValue({ id: 5, firstName: "Ray", lastName: "Shine" }),
            };

            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository);
            const body = {
                patientId: 5,
                clinicianId: 10,
                datetimeFrom: "2025-05-15T12:00:00.000Z",
                datetimeTo: "2025-05-15T13:00:00.000Z",
            };
            const request = {body} as any
            await sut.createAppointment(request, response, next);
            
            expect(next).not.toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({
                id: mockedNewAppointmentId,
                clinician: expect.any(Object),
                patient: expect.any(Object),
                datetimeFrom: new Date("2025-05-15T12:00:00.000Z"),
                datetimeTo: new Date("2025-05-15T13:00:00.000Z"),
            });
        })
    })


});
