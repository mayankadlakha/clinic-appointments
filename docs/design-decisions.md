


API
* Important details about Patient and Clinician (like name, speciality, etc.) will be available in `/appointments` endpoint because these are critical details that will most likely be needed when working with Appointments. The trade-off here is that these entities will be coupled and any changes to Patient or Clinician schema will require changes to the `/appointments` endpoint as well.
* Service layer could be abstracted further by extracting out HTTP specific details into a Controller layer. Decided to keep it all in Service layer for simplicity. As this app expands, might be better to have more separation of concerns.


Architecture
* Route layer currently initialises the Service layer. This coupling is not necessary and could be abstracted away in the future.

* Using Types instead of interfaces/classes for definiing Repository interface. This will atleast provide compile-time protection. In the future, this could be improved by using classes and interfaces to ensure runtime protection.

Persisting Data
I chose to persist data in memory for simplicity. In production, I would replace this with an actual DB. I have tried to implement it in a way that it is easy to replace the in-memory storage with a database in the future.