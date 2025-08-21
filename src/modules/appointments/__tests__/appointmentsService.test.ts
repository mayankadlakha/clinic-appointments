import Clock from "../../../common/clock";
import { AppointmentRepository } from "../../../types/appointmentTypes";
import { ClinicianRepository } from "../../../types/clinicianTypes";
import { PatientRepository } from "../../../types/patientTypes";
import appointmentsService from "../appointmentsService";


describe("appointmentsService", () => {
    const next = jest.fn();
    const response = {
        status: jest.fn(),
        json: jest.fn(),
    } as any;
  
    // Override current server time since tests are using fixed dates
    const currentServerDateTime = new Date("2025-05-15T00:00:00.000Z");
    const beforeCurrentServerDateTime= new Date("2025-05-14T23:59:59.000Z");
    class FixedTimeClock extends Clock {
        override now(): Date {
            return currentServerDateTime;
        }
    }
    const clock = new FixedTimeClock();


    const setup = () => {
        const appointmentsRepository: AppointmentRepository = {
            createAppointment: jest.fn(),
            getListByDatetimeRange: jest.fn(),
            getListByDatetimeFrom: jest.fn(),
            getListByDatetimeRangeAndClinicianId: jest.fn(),
        };
        const cliniciansRepository: ClinicianRepository = {
            getById: jest.fn().mockResolvedValue({ id: 10, firstName: "Sand", lastName: "Dune" }),
        };
        const patientsRepository: PatientRepository = {
            getById: jest.fn().mockResolvedValue({ id: 5, firstName: "Ray", lastName: "Shine" }),
        };

        return {appointmentsRepository, cliniciansRepository, patientsRepository}
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe("createAppointment", () => {
        const body = {
            patientId: 5,
            clinicianId: 10,
            datetimeFrom: "2025-05-15T12:00:00.000Z",
            datetimeTo: "2025-05-15T13:00:00.000Z",
        };

        it("given valid request body, creates appointment", async () => {
            // Setup mocks
            const mockedNewAppointmentId = 5;
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();
            appointmentsRepository.createAppointment = jest.fn().mockResolvedValue(mockedNewAppointmentId);
            appointmentsRepository.getListByDatetimeRangeAndClinicianId = jest.fn().mockResolvedValue([]);

            // Make actual request
            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);
            const request = {body} as any
            await sut.createAppointment(request, response, next);
            
            // Assertions
            expect(next).not.toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({
                id: mockedNewAppointmentId,
                clinician: expect.any(Object),
                patient: expect.any(Object),
                datetimeFrom: new Date("2025-05-15T12:00:00.000Z"),
                datetimeTo: new Date("2025-05-15T13:00:00.000Z"),
            });
        });

        it("given existing appointment for clinician exists, calls next with error", async () => {
            // Setup mocks
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();
            appointmentsRepository.getListByDatetimeRangeAndClinicianId = jest.fn().mockResolvedValue([{id: 0, patientId: 5, clinicianId: 10}]);

            // Make actual request
            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);
            const request = {body} as any
            await sut.createAppointment(request, response, next);

            // Assertions
            expect(next).toHaveBeenCalledWith(expect.objectContaining({statusCode: 409}));
        });

        it.each([
            ["clinicianId undefined", {...body, clinicianId: undefined}, 400],
            ["clinicianId negative", {...body, clinicianId: -1}, 400],
            ["clinicianId string", {...body, clinicianId: "5"}, 400],
            ["patientId undefined", {...body, patientId: undefined}, 400],
            ["patientId negative", {...body, patientId: -1}, 400],
            ["patientId string", {...body, patientId: "5"}, 400],
            ["datetimeFrom invalid", {...body, datetimeFrom: "invalid-date"}, 400],
            ["datetimeFrom not a real datetime", {...body, datetimeFrom: "2025-05-15T25:00:00.000Z"}, 400],
            ["datetimeTo invalid", {...body, datetimeTo: "invalid-date"}, 400],
            ["datetimeTo not a real datetime", {...body, datetimeTo: "2025-05-15T25:00:00.000Z"}, 400],
            ["datetimeFrom occurs after datetimeTo", {...body, datetimeFrom: "2025-05-15T12:00:00.000Z", datetimeTo: "2025-05-15T11:00:00.000Z"}, 400],
            ["appointment duration zero", {...body, datetimeFrom: "2025-05-15T12:00:00.000Z", datetimeTo: "2025-05-15T12:00:00.000Z"}, 400],
            ["datetimeFrom is in the past", {datetimeFrom: beforeCurrentServerDateTime.toISOString()}, 400],
        ])("given invalid request body with %s, calls next with error", async (_, body, statusCode) => {
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();
            
            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);
            const request = {body} as any
            next.mockReset();
            await sut.createAppointment(request, response, next);

            expect(next).toHaveBeenCalledWith(expect.objectContaining({statusCode}));
            expect(response.status).not.toHaveBeenCalled();
            expect(response.json).not.toHaveBeenCalled();
        })
    });

    describe("getAppointmentsList", () => {
        const datetimeFrom = "2025-05-15T12:00:00.000Z";
        const datetimeTo = "2025-05-15T13:00:00.000Z";

        it.each([
            ["datetime range", {datetimeFrom, datetimeTo}],
            [ "datetimeFrom only", {datetimeFrom}],
            [ "no date range", {}]
           ])("given valid request with %s, returns list of appointments", async (_, query) => {
            // Setup mocks
            const mockedList = [{id: 1},{id: 2}]
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();
            appointmentsRepository.getListByDatetimeRange = jest.fn().mockResolvedValue(mockedList);
            appointmentsRepository.getListByDatetimeFrom = jest.fn().mockResolvedValue(mockedList);

            // Make actual request
            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);
            const request = {query} as any
            await sut.getAppointmentsList(request, response, next);
            
            // Assertions
            expect(next).not.toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(mockedList);
        });

        it.each([
            ["datetimeFrom invalid", {datetimeFrom: "invalid-date"}],
            ["datetimeFrom not a real datetime", {datetimeFrom: "2025-05-15T25:00:00.000Z"}],
            ["datetimeTo invalid", {datetimeFrom, datetimeTo: "invalid-date"}],
            ["datetimeTo not a real datetime", {datetimeFrom, datetimeTo: "2025-05-15T25:00:00.000Z"}],
            ["datetimeFrom occurs after datetimeTo", {datetimeFrom: "2025-05-15T12:00:00.000Z", datetimeTo: "2025-05-15T11:00:00.000Z"}],
           ])("given invalid request with %s, calls next with error", async (_, query) => {
            // Setup mocks
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();

            // Make actual request
            const sut = appointmentsService(appointmentsRepository, cliniciansRepository, patientsRepository, clock);
            const request = {query} as any
            await sut.getAppointmentsList(request, response, next);
            
            // Assertions
            expect(next).toHaveBeenCalledWith(expect.objectContaining({statusCode: 400}));
            expect(response.status).not.toHaveBeenCalled();
            expect(response.json).not.toHaveBeenCalled();
        });
    })


});
