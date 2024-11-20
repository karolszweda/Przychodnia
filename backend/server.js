const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "myqsl",
  database: "clinic",
});

// PDF handling
app.get("/api/patient/medical-record-pdf/:userId", async (req, res) => {
  try {
    const [patient] = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [req.params.userId]);

    if (!patient.length) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const pdfPath = path.join(__dirname, "pdfs", `${req.params.userId}.pdf`);

    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).json({ error: "Could not retrieve PDF file" });
      }
    });
  } catch (err) {
    console.error("Error retrieving PDF:", err);
    res.status(500).json({ error: err.message });
  }
});

// Doctor handling
app.get("/api/schedule/:doctorId", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "Start and end dates are required" });
    }

    const [rows] = await db.promise().query(
      `SELECT 
          id,
          doctor_id,
          DATE_FORMAT(date, '%Y-%m-%d') as date,
          TIME_FORMAT(time, '%H:%i') as time,
          is_available,
          patient_name,
          patient_email
        FROM doctor_schedules 
        WHERE doctor_id = ? 
        AND date >= ? 
        AND date <= ?
        ORDER BY date, time`,
      [req.params.doctorId, start, end]
    );

    console.log("Date range:", { start, end });
    console.log("Found schedules:", rows.length);
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/doctor/:doctorId", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT id, name, surname, specialization 
          FROM doctors 
          WHERE id = ?`,
      [req.params.doctorId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Handling appointments
app.post("/api/appointments", async (req, res) => {
  try {
    const { scheduleId, patientName, patientEmail } = req.body;
    await db.promise().query(
      `UPDATE doctor_schedules 
        SET is_available = false, 
            patient_name = ?,
            patient_email = ? 
        WHERE id = ? AND is_available = true`,
      [patientName, patientEmail, scheduleId]
    );
    res.json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/appointments/:appointmentId", async (req, res) => {
  try {
    await db.promise().query(
      `UPDATE doctor_schedules 
       SET is_available = true,
           patient_name = NULL,
           patient_email = NULL
       WHERE id = ?`,
      [req.params.appointmentId]
    );
    res.json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/appointments/:userId", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT 
          'doctor' as type,
          ds.id,
          DATE_FORMAT(ds.date, '%Y-%m-%d') as date, -- Format the date
          ds.time,
          d.name as doctor_name,
          d.surname as doctor_surname,
          d.specialization,
          CASE 
            WHEN ds.date < CURDATE() THEN 'completed'
            ELSE 'scheduled'
          END as status
        FROM doctor_schedules ds
        JOIN doctors d ON ds.doctor_id = d.id
        WHERE ds.patient_email = (
          SELECT email FROM users WHERE id = ?
        )
        UNION ALL
        SELECT
          'vaccination' as type,
          vs.id,
          DATE_FORMAT(vs.date, '%Y-%m-%d') as date, -- Format the date here as well
          vs.time,
          'Vaccination' as doctor_name,
          vs.vaccination_type as doctor_surname,
          'Szczepienie' as specialization,
          CASE 
            WHEN vs.date < CURDATE() THEN 'completed'
            ELSE 'scheduled'
          END as status
        FROM vaccination_schedules vs
        WHERE vs.patient_email = (
          SELECT email FROM users WHERE id = ?
        )
        ORDER BY date, time`,
      [req.params.userId, req.params.userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login handling
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple login check against database
    const [users] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND password = ?", [
        email,
        password,
      ]);

    if (users.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = users[0];

    // Send user data back (except password)
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Register handling
app.post("/api/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      pesel,
      birthDate,
      email,
      phone,
      address,
      city,
      postalCode,
      password,
    } = req.body;

    const fullAddress = `${address}, ${postalCode} ${city}`;

    const [existingUsers] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const [result] = await db.promise().query(
      `INSERT INTO users (
          email, 
          password, 
          name,
          pesel,
          birth_date,
          phone,
          address
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        password,
        `${firstName} ${lastName}`,
        pesel,
        birthDate,
        phone,
        fullAddress,
      ]
    );

    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Patient handling
app.get("/api/patient/:userId", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM users WHERE id = ?`, [req.params.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = rows[0];
    delete patient.password;

    res.json(patient);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Vaccination handling
app.get("/api/vaccinations/schedule", async (req, res) => {
  try {
    const { start, end } = req.query;
    const [rows] = await db.promise().query(
      `SELECT 
          id,
          DATE_FORMAT(date, '%Y-%m-%d') as date, -- Format the date here
          TIME_FORMAT(time, '%H:%i') as time,
          is_available,
          patient_name,
          patient_email,
          vaccination_type
        FROM vaccination_schedules 
        WHERE date >= ? 
        AND date <= ?
        ORDER BY date, time`,
      [start, end]
    );
    res.json(rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/vaccinations/book", async (req, res) => {
  try {
    const { scheduleId, patientName, patientEmail, vaccinationType } = req.body;
    await db.promise().query(
      `UPDATE vaccination_schedules 
        SET is_available = false,
            patient_name = ?,
            patient_email = ?,
            vaccination_type = ?
        WHERE id = ? AND is_available = true`,
      [patientName, patientEmail, vaccinationType, scheduleId]
    );
    res.json({ message: "Vaccination appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
