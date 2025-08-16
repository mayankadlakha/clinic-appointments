


API
* Important details about Patient and Clinician (like name, speciality, etc.) will be available in `/appointments` endpoint because these are critical details that will most likely be needed when working with Appointments. The trade-off here is that these entities will be coupled and any changes to Patient or Clinician schema will require changes to the `/appointments` endpoint as well.