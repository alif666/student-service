// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Create an Express application
const app = express();

// Set up middleware to parse JSON requests
app.use(bodyParser.json());

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL user
  password: "", // Replace with your MySQL password
  database: "studentdb", // Replace with your database name
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

/*########### Student Information ############*/
// GET all Students
app.get("/students", (req, res) => {
  connection.query("SELECT * FROM student", (err, results) => {
    if (err) {
      console.error("Error fetching Students:", err);
      res.status(500).send("Error fetching Students");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("No Students found");
      return;
    }
    res.json(results);
  });
});

// GET Student by ID
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM student WHERE student_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching Student:", err);
        res.status(500).send("Error fetching Student");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Student not found");
        return;
      }
      res.json(results[0]);
    }
  );
});

// POST new Student
app.post("/students", (req, res) => {
  const {
    student_name,
    date_of_birth,
    student_address,
    grade_level,
    guardian_name,
    guardian_contact,
    emergency_contact,
    enrollment_date,
    graduation_date,
    total_subjects,
    average_grade,
    attendance_percentage,
  } = req.body;
  connection.query(
    "INSERT INTO student (student_name, date_of_birth, student_address, grade_level, guardian_name, guardian_contact, emergency_contact, enrollment_date, graduation_date, total_subjects, average_grade, attendance_percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      student_name,
      date_of_birth,
      student_address,
      grade_level,
      guardian_name,
      guardian_contact,
      emergency_contact,
      enrollment_date,
      graduation_date,
      total_subjects,
      average_grade,
      attendance_percentage,
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating Student:", err);
        res.status(500).send("Error creating Student");
        return;
      }
      res.status(201).send("Student created successfully");
    }
  );
});

// PUT update Student by ID
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const {
    student_name,
    date_of_birth,
    student_address,
    grade_level,
    guardian_name,
    guardian_contact,
    emergency_contact,
    enrollment_date,
    graduation_date,
    total_subjects,
    average_grade,
    attendance_percentage,
  } = req.body;
  connection.query(
    "UPDATE student SET student_name=?, date_of_birth=?, student_address=?, grade_level=?, guardian_name=?, guardian_contact=?, emergency_contact=?, enrollment_date=?, graduation_date=?, total_subjects=?, average_grade=?, attendance_percentage=?, updated_at=CURRENT_TIMESTAMP WHERE student_id=?",
    [
      student_name,
      date_of_birth,
      student_address,
      grade_level,
      guardian_name,
      guardian_contact,
      emergency_contact,
      enrollment_date,
      graduation_date,
      total_subjects,
      average_grade,
      attendance_percentage,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating Student:", err);
        res.status(500).send("Error updating Student");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Student not found");
        return;
      }
      res.status(200).send("Student updated successfully");
    }
  );
});

// DELETE Student by ID
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM student WHERE student_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting Student:", err);
        res.status(500).send("Error deleting Student");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Student not found");
        return;
      }
      res.status(200).send("Student deleted successfully");
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
