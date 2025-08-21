# Clinic Appointments API

This project is a RESTful API for managing clinic appointments. 

## Documentation
1. [API Endpoints](#api-endpoints)
2. [Setup](#setup)
3. [Design Decisions](docs/design-decisions.md)
4. [Testing](docs/testing.md)
5. [Enhancements](docs/enhancements.md)
6. [Design Decisions](docs/design-decisions.md)
7. [Assumptions](docs/assumptions.md)
8. [User Stories](docs/user-stories.md)

## API Endpoints
This API currently supports the following functionality:

- Create new appointments
`POST /appointments` to create new appointments with a request body:
```
```json
{
  "patientId": number,
  "clinicianId": number,
  "datetimeFrom": string, // ISO date: "2025-05-05T10:00:00Z"
  "datetimeTo": string, // ISO date: "2025-05-06T10:00:00Z"
}
```
- `GET /appointments` to retrieve a list of appointments with optional query parameters: 
```
```json
/appointments //defaults to current server time for datetimeFrom
/appointments?datetimeFrom=2025-05-05T10:00:00Z
/appointments?datetimeFrom=2025-05-05T10:00:00Z&datetimeTo=2025-05-06T10:00:00Z
```

- `GET /clinicians/:id/appointments` to retrieve a list of appointments for a particular clinicianId with optional query parameters: 
```
```json
/clinicians/:id/appointments //defaults to current server time for datetimeFrom
/clinicians/:id/appointments?datetimeFrom=2025-05-05T10:00:00Z
/clinicians/:id/appointments?datetimeFrom=2025-05-05T10:00:00Z&datetimeTo=2025-05-06T10:00:00Z
```


## Setup
1. Install dependencies using `npm install`
2. Compile the TypeScript code using `npm run build`
3. Start the server using `npm start`

## Simulation
### Bash scripts
You can either use the simulation bash scripts below or the sample curl requests provided further down:
1. Set permission using `chmod +x Simulation.sh`
2. Run `Simulation.sh` to run a happy path simulation of the API using InMemory Repositories
3. Set permission using `chmod +x SimulationValidations.sh`
4. Run `SimulationValidations.sh` to run error paths of the API using InMemoryRepositories

### Curl Requests
These curl requests assume that the API is running on localhost:3000
*Create appointment*
```
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T12:00:00.000Z",
        "datetimeTo": "2025-08-16T13:00:00.000Z"
    }'
```

*Get appointments list*
```
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T12:00:00.000Z&datetimeTo=2025-08-16T13:00:00.000Z" \
    -H "Content-Type: application/json"
```

Get appointments list for a specific clinician
```
curl -i -X GET "http://localhost:3000/clinicians/0/appointments?datetimeFrom=2025-08-16T12:00:00.000Z&datetimeTo=2025-08-16T14:00:00.000Z" \
    -H "Accept: application/json"
```


