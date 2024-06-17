Guidelines
▪ Add Validation to all endpoints with inputs
▪ Document all Queries/Stored Procedures
▪ Clean folder structure
▪ No redundant Code (use Database Helpers)
▪ Protect all routes
▪ Normalize your tables to 3NF
▪ Build Collections with Postman
▪ Handle all errors
▪ For all delete endpoints use Soft Delete.



Backend Project
Tour Service:
o Create a function to create a new tour in the database.
o Create functions to get all tours, get a specific tour by ID, update a tour,
and delete a tour (Admin only except getting all tours).
o Use tokens to determine if someone is An Admin or Not.

User Service:
o Create a function for user registration (including password hashing).
o Create functions to get all users (Admin only), get a specific user by ID
(Admin or same user), update user information (User themself or
Admin), and delete a user (Admin only).

Hotel Service:
o Create a function to create a new hotel in the database.
o Create functions to get all hotels, get a specific hotel by ID, update a hotel,
and delete a hotel (Admin only except getting all hotels).
o Use tokens to determine if someone is An Admin or Not

Booking Service:
o Create a function to create a booking, allowing users to select tours and
hotels.
o Create functions to get all bookings (Admin only), get a specific booking
by ID (User who made it or Admin), update a booking (User who made
it or Admin), and cancel a booking (User who made it or Admin).
o Read user Id (The person making the booking) from the token

Background Services
o Send email to all new User
o Send an Email whenever a user makes a booking