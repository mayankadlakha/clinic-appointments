#!/bin/bash

echo "Create 2 appointments: clinicianId 0 and clinicianId 1 from 12:00pm to 1:00pm"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T12:00:00.000Z",
        "datetimeTo": "2025-08-16T13:00:00.000Z"
    }'

curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 1,
        "patientId": 1,
        "datetimeFrom": "2025-08-16T12:00:00.000Z",
        "datetimeTo": "2025-08-16T13:00:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Get all appointments from 12:00pm"
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T12:00:00.000Z" \
    -H "Accept: application/json"


echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Create two appointments for clinicianId 0: first from 1:00pm to 2:00pm, second from 2:00pm to 3:00pm"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T13:00:00.000Z",
        "datetimeTo": "2025-08-16T14:00:00.000Z"
    }'

curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T14:00:00.000Z",
        "datetimeTo": "2025-08-16T15:00:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Get all appointments for clinicianId 0 from 12:00pm to 2:00pm. Only 2 appointments will appear. Last appointment will be excluded."
curl -i -X GET "http://localhost:3000/clinicians/0/appointments?datetimeFrom=2025-08-16T12:00:00.000Z&datetimeTo=2025-08-16T14:00:00.000Z" \
    -H "Accept: application/json"
