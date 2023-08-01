# orders-quotes-bookings
A Delivery Management System

## Client: A suite of API tests
Install the api test dependencies: `npm ci`.
Run the api tests: `npm test`.

## Server: Endpoints for the API tests to pass (*In `./server` directory):
Install dependencies: `npm ci`
Run Server: `npm start`

* The API Schema is documented in `api-schema.md`
* The application state resets every time the server restarts (In-memory Persistence layer)
* This code follows Functional Domain Driven Design: https://antman-does-software.com/functional-domain-driven-design-simplified

# Improvements
* CODE SHARING & REUSE: Find a better way to Share code between FE and BE (models, interfaces, enums, utils etc)
* REFACTOR server.ts file (use express router and move route associations to separate file)
* REFACTOR api-tests into separate files (Orders, Quotes, Bookings etc)
* Avoid duplicate string literals, used all over the places (may be use enum values instead)
* Introduce a linting system (A lot of objects have last properties ending with an unnecessary comma. It may cause issues in IDEs or CI/CD pipelines with corresponding rules enabled)
