import { AppointmentRepository } from "../../../types/appointmentTypes";
import { ClinicianRepository } from "../../../types/clinicianTypes";
import { PatientRepository } from "../../../types/patientTypes";
import cliniciansService from "../cliniciansService";


describe("cliniciansService", () => {
    const next = jest.fn();
    const response = {
        status: jest.fn(),
        json: jest.fn(),
    } as any;

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

    describe("getAppointmentsListByClinicianId", () => {
        const datetimeFrom = "2025-05-15T12:00:00.000Z";
        const datetimeTo = "2025-05-15T13:00:00.000Z";
        const params = {id: 5};

        it.each([
            ["datetime range", params, {datetimeFrom, datetimeTo}],
            [ "datetimeFrom only", params, {datetimeFrom}],
            [ "no date range", params, {}]
           ])("given valid request with %s, returns list of appointments", async (_, params, query) => {
            // Setup mocks
            const mockedList = [{id: 1},{id: 2}]
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();
            appointmentsRepository.getListByDatetimeRangeAndClinicianId = jest.fn().mockResolvedValue(mockedList);

            // Make actual request
            const sut = cliniciansService(appointmentsRepository, cliniciansRepository, patientsRepository);
            const request = {params, query} as any
            await sut.getAppointmentsListByClinicianId(request, response, next);
            
            // Assertions
            expect(next).not.toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(mockedList);
        });

        it.each([
            ["clinicianId undefined", {}, {datetimeFrom}],
            ["clinicianId negative", {id: -5}, {datetimeFrom}],
            ["clinicianId string", {id: "5"}, {datetimeFrom}],
            ["datetimeFrom invalid", params, {datetimeFrom: "invalid-date"}],
            ["datetimeFrom not a real datetime", params, {datetimeFrom: "2025-05-15T25:00:00.000Z"}],
            ["datetimeTo invalid", params, {datetimeFrom, datetimeTo: "invalid-date"}],
            ["datetimeTo not a real datetime", params, {datetimeFrom, datetimeTo: "2025-05-15T25:00:00.000Z"}],
            ["datetimeFrom occurs after datetimeTo", params, {datetimeFrom: "2025-05-15T12:00:00.000Z", datetimeTo: "2025-05-15T11:00:00.000Z"}],
           ])("given invalid request with %s, calls next with error", async (_, params, query) => {
            // Setup mocks
            const {appointmentsRepository, cliniciansRepository, patientsRepository} = setup();

            // Make actual request
            const sut = cliniciansService(appointmentsRepository, cliniciansRepository, patientsRepository);
            const request = {params, query} as any
            await sut.getAppointmentsListByClinicianId(request, response, next);
            
            // Assertions
            expect(next).toHaveBeenCalledWith(expect.objectContaining({statusCode: 400}));
            expect(response.status).not.toHaveBeenCalled();
            expect(response.json).not.toHaveBeenCalled();
        });
    })


});
