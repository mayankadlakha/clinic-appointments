#!/bin/bash

# # Start the API server
# npm run buildStart
# SERVER_PID=$!

# # Wait for the server to start
# sleep 3

echo "Create 2 appointments: clinicianId 0 and clinicianId 1 at 12:00pm to 1:00pm"
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

echo "Create two appointments for clinicianId 0: first at 1:00pm to 2:00pm, second at 2:00pm to 3:00pm"
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



# echo -e "\n ------------------------------------------------------------------------------ \n"


# echo "Get Appointments list - from 3:30pm to 4:00pm: should return 1 record"
# curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T15:30:00.000Z&datetimeTo=2025-08-16T16:00:00.000Z" \
#     -H "Accept: application/json"


# echo -e "\n ------------------------------------------------------------------------------ \n"

# echo "Create Appointments list with valid information"
# curl -i -X POST "http://localhost:3000/appointments" \
#     -H "Content-Type: application/json" \
#     -d '{
#         "clinicianId": 0,
#         "patientId": 0,
#         "datetimeFrom": "2025-08-16T15:30:00.000Z",
#         "datetimeTo": "2025-08-16T16:00:00.000Z"
#     }'

# echo "Get Appointments list - from 3:30pm to 4:00pm: should return 2 records now"
# curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T15:30:00.000Z&datetimeTo=2025-08-16T16:00:00.000Z" \
#     -H "Accept: application/json"

# echo -e "\n ------------------------------------------------------------------------------ \n"

# echo "Get Appointments list with invalid dates"
# curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T14:30:00.000Z&datetimeTo=2025-08-15T14:30:00.000Z" \
#     -H "Accept: application/json"


# echo -e "\n ------------------------------------------------------------------------------ \n"

# echo "Get unknown route"
# curl -i -X GET "http://localhost:3000/appointgaments" \
#     -H "Accept: application/json"