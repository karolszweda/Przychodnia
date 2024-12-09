const mysql = require("mysql2/promise");

async function initDb() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root-password",
    multipleStatements: true,
  });

  try {
    await connection.query("CREATE DATABASE IF NOT EXISTS clinic");
    await connection.query("USE clinic");

    // Doctors table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        specialization VARCHAR(255) NOT NULL
      )
    `);
    await connection.query(`
      INSERT INTO doctors (name, surname, specialization) 
      VALUES 
        ('Marcin', 'Podkowa', 'Dermatolog'),
        ('Jadwiga', 'Śmiałek', 'Okulistka'),
        ('Malgorzata', 'Kwiatkowska', 'Pediatra'),
        ('Bronisława', 'Nowocień', 'Laryngolog'),
        ('Anna', 'Nowak', 'Neurolog'),
        ('Sylwester', 'Stanisław', 'Ortopeda'),
        ('Bartłomiej', 'Sadzikowski', 'Kardiolog')
      ON DUPLICATE KEY UPDATE specialization=VALUES(specialization)
    `);

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        pesel VARCHAR(11),
        birth_date DATE,
        phone VARCHAR(15),
        address TEXT,
        allergies TEXT DEFAULT NULL,
        chronic_diseases TEXT DEFAULT NULL,
        medications TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`
      INSERT INTO users (
        email, 
        password, 
        name, 
        pesel, 
        birth_date, 
        phone, 
        address, 
        allergies, 
        chronic_diseases, 
        medications
      ) 
      VALUES 
        (
          'test@test.com', 
          'test123', 
          'Test User',
          '90080212345',
          '1990-08-02',
          '123-456-789',
          'ul. Testowa 1, 00-001 Warszawa',
          'Pyłki, kurz',
          'Nadciśnienie',
          'Acard'
        ),
        (
          'user@example.com', 
          'password123', 
          'John Doe',
          '85060187654',
          '1985-06-01',
          '987-654-321',
          'ul. Przykładowa 2, 00-002 Warszawa',
          'Brak',
          'Brak',
          'Brak'
        )
      ON DUPLICATE KEY UPDATE 
        name=VALUES(name),
        pesel=VALUES(pesel),
        birth_date=VALUES(birth_date),
        phone=VALUES(phone),
        address=VALUES(address),
        allergies=VALUES(allergies),
        chronic_diseases=VALUES(chronic_diseases),
        medications=VALUES(medications)
    `);

    // Doctor schedules table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS doctor_schedules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        is_available BOOLEAN DEFAULT TRUE,
        patient_name VARCHAR(255),
        patient_email VARCHAR(255),
        FOREIGN KEY (doctor_id) REFERENCES doctors(id)
      )
    `);

    await connection.query("TRUNCATE TABLE doctor_schedules");

    // Create schedules for each doctor
    const next28Days = [...Array(35)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i - 7);
      return date.toISOString().split("T")[0];
    });

    console.log("Generating schedules for dates:", next28Days);
    for (let doctorId = 1; doctorId <= 7; doctorId++) {
      for (const date of next28Days) {
        const dayOfWeek = new Date(date).getDay();
        const startHour = dayOfWeek === 0 || dayOfWeek === 6 ? 10 : 8;
        const endHour = dayOfWeek === 0 || dayOfWeek === 6 ? 14 : 17;

        for (let hour = startHour; hour < endHour; hour++) {
          const timeSlot = `${hour.toString().padStart(2, "0")}:00:00`;
          await connection.query(
            `INSERT INTO doctor_schedules 
             (doctor_id, date, time, is_available) 
             VALUES (?, ?, ?, true)`,
            [doctorId, date, timeSlot]
          );
        }
      }
    }

    await connection.query(`
  CREATE TABLE IF NOT EXISTS vaccination_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    patient_name VARCHAR(255),
    patient_email VARCHAR(255),
    vaccination_type VARCHAR(50)
  )
`);

    // Vaccination table
    await connection.query("TRUNCATE TABLE vaccination_schedules");

    for (const dateStr of next28Days) {
      const date = new Date(dateStr);
      const dayOfWeek = date.getDay();
      const startHour = dayOfWeek === 0 || dayOfWeek === 6 ? 10 : 8;
      const endHour = dayOfWeek === 0 || dayOfWeek === 6 ? 14 : 17;

      for (let hour = startHour; hour < endHour; hour++) {
        await connection.query(
          `INSERT INTO vaccination_schedules (date, time, is_available) 
       VALUES (?, ?, true)`,
          [dateStr, `${hour.toString().padStart(2, "0")}:00:00`]
        );
      }
    }

    // Add example appointments for Test User to diplay historic appointments
    await connection.query(`
  -- Past doctor appointments
  UPDATE doctor_schedules 
  SET is_available = false,
      patient_name = 'Test User',
      patient_email = 'test@test.com'
  WHERE date < CURDATE() 
  ORDER BY RAND()
  LIMIT 2;

  -- Future doctor appointments
  UPDATE doctor_schedules 
  SET is_available = false,
      patient_name = 'Test User',
      patient_email = 'test@test.com'
  WHERE date > CURDATE() 
  ORDER BY RAND()
  LIMIT 2;

  -- Past vaccination
  UPDATE vaccination_schedules 
  SET is_available = false,
      patient_name = 'Test User',
      patient_email = 'test@test.com',
      vaccination_type = CASE 
        WHEN RAND() < 0.5 THEN 'FLU'
        ELSE 'COVID'
      END
  WHERE date < CURDATE()
  ORDER BY RAND()
  LIMIT 1;

  -- Future vaccination
  UPDATE vaccination_schedules 
  SET is_available = false,
      patient_name = 'Test User',
      patient_email = 'test@test.com',
      vaccination_type = 'COVID'
  WHERE date > CURDATE()
  ORDER BY RAND()
  LIMIT 1;
`);

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await connection.end();
  }

}

initDb();
