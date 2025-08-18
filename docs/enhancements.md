# Enhancements

I have added some additional things that were not mentioned in the original requirements.

* A middleware to return HTTP Code 404 if requested resource does not exist 

* I would use objects in for params to avoid any confusion with parameter order.

* Move the date range logic to the repository, since it aligns more with business logic rather than repository logic.

* Service layer could be refactored to separate out validation code.

* Instead of having two functions for date range, I could just past in max date range