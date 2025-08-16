## Workflow
1. Admin creates Clinician account.
2. Clinician adds available appointments. 
3. Patient creates Patient account. 
4. Patient views all available Clinicians and appointments.
5. Patient books appointment with a Clinician. [IN SCOPE]
6. Patient confirms attendance.
  * A. Patient confirms appointment.
  * B. Patient cancels appointment.
7. Admin checks all appointments for the day. [IN SCOPE]
8. Clinician checks their schedule for the day. [IN SCOPE]
9. Patient attends appointment and appointment is marked as completed.

## User Stories
### Clinician
As a clinician, I want to be able to view all my appointments for the day so I can prepare for the appointments.
Security: Internal 
Action: GET appointments by clinicianId


### Patient
As a patient, I want to be able to book a new appointment with a clinician so I can visit the clinic.
Security: External
Action: CREATE appointment


### Admin
As a clinic admin, I want to be able to see all appointments for the day so I can manage the clinic effectively.
Security: Internal
Action: GET appointments list