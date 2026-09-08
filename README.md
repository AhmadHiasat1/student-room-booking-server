# Student Room Booking API

The backend API for the Student Study Room Booking System.

The API is built using Express.js and connects to a PostgreSQL database.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- pg
- CORS

## Run the Backend

Install dependencies:

npm install

Start the server:

node server.js

The server runs on:

http://localhost:5000

## Database

Database name:

student_room_booking

The database contains three main tables:

- students
- rooms
- bookings

The database structure and sample data are available in `schema.sql`.

## API Endpoints

### GET /rooms

Retrieves all study rooms from the database.

Example:

GET /rooms

### GET /bookings

Retrieves all bookings with student and room information.

Example:

GET /bookings

### POST /bookings

Creates a new booking.

Example request body:

{
  "student_id": 1,
  "room_id": 1,
  "booking_date": "2026-09-15",
  "start_time": "10:00",
  "end_time": "11:00",
  "purpose": "Study"
}

### PUT /bookings/:id

Updates an existing booking.

Example:

PUT /bookings/1

Example request body:

{
  "booking_date": "2026-09-16",
  "start_time": "12:00",
  "end_time": "13:00",
  "purpose": "Group Study"
}

### DELETE /bookings/:id

Deletes an existing booking.

Example:

DELETE /bookings/1

## CRUD Operations

The API supports the four main CRUD operations:

- Create - POST
- Read - GET
- Update - PUT
- Delete - DELETE