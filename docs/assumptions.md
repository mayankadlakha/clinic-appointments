# Assumptions

Appointments
* Once an appointment is cancelled, its status will update to "available". There is no connection between appointments and patients once the appointment is cancelled.
* Type is fixed to only three types: initial consult, subsequent (follow-up) consult, and long consult. This could be customisable for each clinic and stored in DB as a separate entity.