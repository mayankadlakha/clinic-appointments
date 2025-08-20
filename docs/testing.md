

The Service layer is tested properly since that is where most of the business logic sits. For these tests, the Repository Layer is mocked because the system under tests is the Service and not the Repository.

Ideally, there should be separate tests for the Repository Layer and possibly even for the routes and Express setup. 

A decision was made not to use one big integration test, because integration tests can be hard to maintain and make it harder to switch out different layers. If needed, the preference would be to have light integration tests that do some sort of smoke test.

One limitation of this approach is that a lot of mocks have to be used. That can make it harder to maintain and also brings in a lot of implementation details into the test. A future improvement could be separating the Service layer in a way that it is more of a black-box which can be tested without needing too many mocks.