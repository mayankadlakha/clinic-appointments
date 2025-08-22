# Enhancements

I have added some additional things that were not mentioned in the original requirements.

* A middleware to return HTTP Code 404 if requested resource does not exist 
* Instead of having two functions for date range, I could just pass in max date range. Started to do this for CliniciansService but needs to be rolled out properly.
* Repository layer is flexible can be switched easily between inMemory and a DB.
* Added a Clock so time can be managed easily for the server.
* Added an error handling middleware to catch and respond to errors consistently.
* A catch all for unhandledRejection errors to capture any promise rejections.
* Kept the idea of idempotency in mind when building the API for the GET requests.








## Future work
* I would remove getListByDatetimeFrom function in Repository Layer and instead just have the getListByDatetimeRange function handle both cases. This will also help simplify the Service layer.
* Move the date range logic to the service, since it aligns more with business logic rather than repository logic.
* Service layer could be refactored to separate out validation code.
* Generate proper API contract documentation
* Use UTC time for the server to ensure consistency
* I would use objects in for params to avoid any confusion with parameter order.
* Add a global App logger instead of doing console.log and provide consistent logs.

## Future mechanisms
* Consider Rate limiting if this API is expected to handle a large number of requests.
* Add role based entitlements and permissions.
* Contract tests
* Versioning if needed
* Gracefule shutdown of the server
