

The Service layer is tested properly since that is where most of the business logic sits. For these tests, the Repository Layer is mocked because the system under tests is the Service and not the Repository.

Ideally, there should be separate tests for the Repository Layer and possibly even for the routes and Express setup. 

A decision was made not to use one big integration test, because integration tests can be hard to maintain and make it harder to switch out different layers. If needed, the preference would be to have light integration tests that do some sort of smoke test.

One limitation of this approach is that a lot of mocks have to be used. That can make it harder to maintain and also brings in a lot of implementation details into the test. A future improvement could be separating the Service layer in a way that it is more of a black-box which can be tested without needing too many mocks.

The tests could also have better coverage. For example, currently they do not test what date is used if datetimeFrom is not provided. Tests like these would provide better coverage of default behaviors.

More tests could be added for scenarios like when clinician does not exist or patient does not exist.


Constraints
* Had to mock the global Date to control datetimes for the tests. In future, could modify the service to take in current datetime, makes it more testable and also removes dependency on server time (e.g. if you wanted to respect a universal timezone).