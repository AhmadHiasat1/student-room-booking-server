CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    capacity INTEGER CHECK (capacity > 0),
    location VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('Available', 'Maintenance')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(room_id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose VARCHAR(200),
    status VARCHAR(20) CHECK (status IN ('Pending', 'Confirmed', 'Cancelled')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO students (full_name, email, phone)
VALUES
('Ahmad Student', 'ahmad@student.com', '0790000000');

INSERT INTO rooms (room_name, capacity, location, description, status)
VALUES
('Study Room A101', 4, 'Building A - First Floor', 'Whiteboard, Power Outlets', 'Available'),
('Study Room A102', 6, 'Building A - First Floor', 'Monitor, Whiteboard', 'Available'),
('Study Room B201', 8, 'Building B - Second Floor', 'Monitor, Power Outlets', 'Available');

INSERT INTO bookings (
    student_id,
    room_id,
    booking_date,
    start_time,
    end_time,
    purpose,
    status
)
VALUES
(1, 1, '2026-09-11', '12:00', '13:00', 'Group Study', 'Confirmed');