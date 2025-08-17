#!/bin/bash

echo "Get Appointments list - from 3:30pm: should return 2 records"
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T15:30:00.000Z" \
    -H "Accept: application/json"

echo -e "\n ------------------------------------------------------------------------------ \n"


echo "Get Appointments list - from 3:30pm to 4:00pm: should return 1 record"
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T15:30:00.000Z&datetimeTo=2025-08-16T16:00:00.000Z" \
    -H "Accept: application/json"


echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Get Appointments list with invalid dates"
curl -i -X GET "http://localhost:3000/appointments?datetimeFrom=2025-08-16T14:30:00.000Z&datetimeTo=2025-08-15T14:30:00.000Z" \
    -H "Accept: application/json"


echo -e "\n ------------------------------------------------------------------------------ \n"

echo "Get unknown route"
curl -i -X GET "http://localhost:3000/appointgaments" \
    -H "Accept: application/json"