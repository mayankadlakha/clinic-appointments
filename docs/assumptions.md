# Assumptions

Appointments
* Once an appointment is cancelled, its status will update to "available". There is no connection between appointments and patients once the appointment is cancelled.
* Type is fixed to only three types: initial consult, subsequent (follow-up) consult, and long consult. This could be customisable for each clinic and stored in DB as a separate entity.
* If an appointment starts within datetimeFrom and datetimeTo range provided, it will be returned for GET `/appointments` request. There may be a use case where having appointments that start before datetimeFrom but end within the date range would also be needed by the consumer. This can be expanded in the future if needed.
* If an appointment starts at exactly the datetimeTo provided for GET `/appointments`, it will not be included in the results returned. This was assumed based on the thinking that no ongoing part of the appointment is within the range, just the very start of it. This also aligns with the concept of "touching" mentioned in the requirements.
* If a patient has overlapping appointment, they can still book a new appointment with another clinician. The assumption here is that perhaps the patient wants to book the new clinician while the appointment is available and then cancel the old appointment later.