# Assumptions

Appointments
* Once an appointment is cancelled, its status will update to "available". There is no connection between appointments and patients once the appointment is cancelled.
* Type is fixed to only three types: initial consult, subsequent (follow-up) consult, and long consult. This could be customisable for each clinic and stored in DB as a separate entity.
* If an appointment starts within datetimeFrom and datetimeTo range provided, it will be returned for GET `/appointments` request. There may be a use case where having appointments that start before datetimeFrom but end within the date range would also be needed by the consumer. This can be expanded in the future if needed.

