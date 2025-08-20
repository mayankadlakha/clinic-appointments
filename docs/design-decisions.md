


API
* Important details about Patient and Clinician (like name, speciality, etc.) will be available in `/appointments` endpoint because these are critical details that will most likely be needed when working with Appointments. The trade-off here is that these entities will be coupled and any changes to Patient or Clinician schema will require changes to the `/appointments` endpoint as well.
* Service layer could be abstracted further by extracting out HTTP specific details into a Controller layer. Decided to keep it all in Service layer for simplicity. As this app expands, might be better to have more separation of concerns. The service layer is starting to get quite large and complex.


Architecture
* Route layer currently initialises the Service layer. This coupling is not necessary and could be abstracted away in the future.
* Ideally, you would have most of the business logic (like validations) closer to the DB. In this case the API is doing a lot of validations. The trade-off here is that this can lead to a lot of duplication between the DB layer and the API and the validations can start to drift. However, the benefit here is that you get early validation and save DB resources for invalid requests.
* Repository layer is kept quite simple and does not have much business logic. This is to make it easier to switch the Repository layer in the future. However, it does assume that this layer would have ability to do basic things like join different tables (e.g. Appointments and Clinicians) and filter by properties like dates.

* Using Types instead of interfaces/classes for definiing Repository interface. This will atleast provide compile-time protection. In the future, this could be improved by using classes and interfaces to ensure runtime protection.

Persisting Data
I chose to persist data in memory for simplicity. In production, I would replace this with an actual DB. I have tried to implement it in a way that it is easy to replace the in-memory storage with a database in the future.

Decided to pass in Clinician and Patient objects to createAppointment because it gives better type protection. However, the trade-off here is that the DB layer function requires a lot more than is needed.


Types
- Application (API layer) has basic fields that I have assumed would be useful for most use cases of the API


Limitations
* Service is quite coupled to Express framework. In future, could make service more simple and the router/controller can handle Express specific details. It also makes it a bit harder to test the service in isolation, without using a lot of mocks.