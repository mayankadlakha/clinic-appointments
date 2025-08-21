#!/bin/bash

echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Create 1 appointment: clinicianId 0 from 10:00am to 11:00am"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T10:00:00.000Z",
        "datetimeTo": "2025-08-16T11:00:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Create appointment: overlap with previous appointment - expect error"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T10:59:00.000Z",
        "datetimeTo": "2025-08-16T11:30:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Create appointment: with datetimeFrom after datetimeTo - expect error"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T11:00:00.000Z",
        "datetimeTo": "2025-08-16T10:00:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Create appointment: with zero length - expect error"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2025-08-16T09:00:00.000Z",
        "datetimeTo": "2025-08-16T09:00:00.000Z"
    }'

echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Create appointment: in the past - expect error"
curl -i -X POST "http://localhost:3000/appointments" \
    -H "Content-Type: application/json" \
    -d '{
        "clinicianId": 0,
        "patientId": 0,
        "datetimeFrom": "2001-08-16T09:00:00.000Z",
        "datetimeTo": "2001-08-16T10:00:00.000Z"
    }'



echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Get all appointments with datetimeFrom set to same value as datetimeTo - expect error"
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T10:30:00.000Z&datetimeTo=2025-08-16T10:30:00.000Z" \
    -H "Accept: application/json"

echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Get all appointments for a non-existent clinician - expect error"
curl -i -X GET "http://localhost:3000/clinicians/90/appointments?datetimeFrom=2025-08-16T10:30:00.000Z" \
    -H "Accept: application/json"


echo -e "\n ------------------------------------------------------------------------------ \n"
echo "Get unknown route"
curl -i -X GET "http://localhost:3000/appointgaments" \
    -H "Accept: application/json"