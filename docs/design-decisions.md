
# Design Decisions

## Architecture
Current design has a Service dedicated to each route:
appointmentsService
* Get `/appoinments`
* Post `/appointments`

cliniciansService
* Get `/clinicians/:id/appointments`

The Repositories are shared and can be used across Services.

### Strengths of this approach
* Each service is responsible for a specific parent route. This keeps the route to service mapping quite intuitive.
* This can also scale well if different teams own different domains and want to be able to make changes without affecting other teams. So, the duplication that arises here can be a strength depending on the organisation structure.
* Allows each route to evolve independently. For example, if Clinicians needed different information in their appointments, CliniciansService could provide that.

### Cons of this approach
* Services may have to duplicate logic since they are dealing with different resources. For example, clinician has to know about Appointments and also has to do a lot of validations that Appointments service does.
* The duplication also leads to coupling and that makes it harder to change one service without affecting another.

### Alternatives
* Services are based on Resources and Domain rather than routes. For example, Get `/clinicians/:id/appointments` would also use AppointmentsService since this endpoint deals with appointments resource/concept.
* An iteration of this could be pointing the CliniciansService to AppointmentService for the appointment-related logic. And AppointmentsService could call CliniciansService to check if clinician exists, etc.


## Loosely coupled repositories
Services are dependent on an interface rather than a specific Repository type. Currently, InMemoryRepository is used, however, it can easily be substituted with another type (e.g. SQLLite)

## Middlewares
There are middlewares to catch errors and route not found.
One enhancement would be having a catch all for other error types. Currently, only catch unhandledRejection.

## Other considerations
* Route layer currently initialises the Service layer. This coupling is not necessary and could be abstracted away in the future.
* Currently, the Service layer is doing a lot of validations outside the Repository. The trade-off here is that this can lead to a lot of duplication between the Repository layer and the API and the validations can start to drift. However, the benefit here is that you get early validation and save DB resources for invalid requests.
* Repository layer is kept quite simple and does not have much business logic. This is to make it easier to switch the Repository layer in the future. However, it does assume that this layer would have ability to do basic things like join different tables (e.g. Appointments and Clinicians) and filter by properties like dates.
* App.ts has a lot of setup at the moment. Would ideally separate that out so that app setup is simple and a lot of the Repository/Router/Service setup could be delegated.
* Service layer could be abstracted further by extracting out HTTP specific details into a Controller layer. Decided to keep it all in Service layer for simplicity. As this app expands, might be better to have more separation of concerns. The service layer is starting to get quite large and complex.
* Important details about Patient and Clinician (like name, speciality, etc.) will be available in `/appointments` endpoint because these are critical details that will most likely be needed when working with Appointments. The trade-off here is that these entities will be coupled and any changes to Patient or Clinician schema will require changes to the `/appointments` endpoint as well.
* Using Types instead of interfaces/classes for definiing Repository interface. This will atleast provide compile-time protection. In the future, this could be improved by using classes and interfaces to ensure runtime protection.
* Decided to pass in Clinician and Patient objects to createAppointment because it gives better type protection. However, the trade-off here is that the DB layer function requires a lot more than is needed.
* Application (API layer) has basic fields that I have assumed would be useful for most use cases of the API


## Limitations
* Service is quite coupled to Express framework. In future, could make service more simple and the router/controller can handle Express specific details. It also makes it a bit harder to test the service in isolation, without using a lot of mocks.
* Appointments service uses current server time to default datetimeFrom when it isnt provided. This time could be different from the client and may lead to unexpected results.
* There is logic sitting in the Repository Layer that should really be in Service layer. Plan is to refactor that and move it to the Service layer.