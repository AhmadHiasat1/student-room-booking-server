require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.send("Student Room Booking API is running");
});

app.get("/rooms", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM rooms ORDER BY room_id"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        bookings.booking_id,
        bookings.booking_date,
        bookings.start_time,
        bookings.end_time,
        bookings.purpose,
        bookings.status,
        students.full_name,
        rooms.room_name,
        rooms.location
      FROM bookings
      JOIN students
        ON bookings.student_id = students.student_id
      JOIN rooms
        ON bookings.room_id = rooms.room_id
      ORDER BY bookings.booking_id
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const {
      student_id,
      room_id,
      booking_date,
      start_time,
      end_time,
      purpose,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings
      (student_id, room_id, booking_date, start_time, end_time, purpose, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'Confirmed')
      RETURNING *`,
      [
        student_id,
        room_id,
        booking_date,
        start_time,
        end_time,
        purpose,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.put("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      booking_date,
      start_time,
      end_time,
      purpose,
    } = req.body;

    const result = await pool.query(
      `UPDATE bookings
      SET
        booking_date = $1,
        start_time = $2,
        end_time = $3,
        purpose = $4,
        updated_at = NOW()
      WHERE booking_id = $5
      RETURNING *`,
      [
        booking_date,
        start_time,
        end_time,
        purpose,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM bookings
      WHERE booking_id = $1
      RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});