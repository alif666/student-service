// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

// Create an Express application
const app = express();

// Set up middleware to parse JSON requests
app.use(bodyParser.json());

// PostgreSQL database connection configuration
const connection = new Client({
  host: "dpg-cn01n9md3nmc73897nj0-a",
  port: 5432,
  database: "studentdb_t12s",
  user: "studentdb_t12s_user",
  password: "MPpXWaKJbv94nZdFwKcDWItYBp3mXT3n",
});

// Connect to PostgreSQL database
connection
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to database:", err));

/*########### Student Information ############*/
// GET all Students
app.get("/students", (req, res) => {
  connection.query("SELECT * FROM student", (err, results) => {
    if (err) {
      console.error("Error fetching Students:", err);
      res.status(500).send("Error fetching Students");
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).send("No Students found");
      return;
    }
    res.json(results.rows);
  });
});

// GET Student by ID
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM student WHERE student_id = $1",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching Student:", err);
        res.status(500).send("Error fetching Student");
        return;
      }
      if (results.rows.length === 0) {
        res.status(404).send("Student not found");
        return;
      }
      res.json(results.rows[0]);
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
    "INSERT INTO student (student_name, date_of_birth, student_address, grade_level, guardian_name, guardian_contact, emergency_contact, enrollment_date, graduation_date, total_subjects, average_grade, attendance_percentage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
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
    (err) => {
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
    "UPDATE student SET student_name=$1, date_of_birth=$2, student_address=$3, grade_level=$4, guardian_name=$5, guardian_contact=$6, emergency_contact=$7, enrollment_date=$8, graduation_date=$9, total_subjects=$10, average_grade=$11, attendance_percentage=$12, updated_at=CURRENT_TIMESTAMP WHERE student_id=$13",
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
      if (result.rowCount === 0) {
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
    "DELETE FROM student WHERE student_id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting Student:", err);
        res.status(500).send("Error deleting Student");
        return;
      }
      if (result.rowCount === 0) {
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
