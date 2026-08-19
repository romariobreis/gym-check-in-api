# Gym Check-in API

A RESTful API built with Node.js that implements a Gympass-style gym management and check-in system. This application allows users to register, authenticate, search for nearby gyms, and perform check-ins, while administrators can manage gym registrations and validate user check-ins. The API follows SOLID principles and includes comprehensive business rules and validation logic.

## FRs (Functional Requirements)
- [x] It should be possible to sign up;
- [x] It should be possible to authenticate;
- [x] It should be possible to get the profile of a logged-in user;
- [x] It should be possible to get the total check-ins made by the logged-in user;
- [x] It should be possible for the user to get their check-in history;
- [x] It should be possible for the user to search for nearby gyms;
- [x] It should be possible for the user to search for a gym by name;
- [x] It should be possible for the user to check in at a gym;
- [x] It should be possible to validate a user's check-in;
- [x] It should be possible to register a gym.

## BR (Business Rules)

- [x] The user cannot sign up with a duplicate email;
- [x] The user cannot make more than one check-in in the same day;
- [x] The user cannot check in if not close to the gym (100m);
- [x] The check-in can be validated up to 20min after being created;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

## NFR (Non-Functional Requirements)

- [x] The user's password must be encrypted;
- [x] The application's data must be persisted in a postgres database;
- [x] All data lists must be paginated (20 items per page);
- [x] The user must be identified by a JWT.