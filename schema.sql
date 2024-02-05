CREATE TABLE student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(255),
    date_of_birth DATE,
    student_address VARCHAR(255),
    grade_level INT,
    guardian_name VARCHAR(255),
    guardian_contact VARCHAR(20),
    emergency_contact VARCHAR(20),
    enrollment_date DATE,
    graduation_date DATE,
    total_subjects INT,
    average_grade DECIMAL(5, 2),
    attendance_percentage DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO student (
  student_name,
  date_of_birth,
  student_address,
  grade_level,
  guardian_name,
  guardian_contact,
  emergency_contact,
  total_subjects,
  average_grade,
  attendance_percentage
) VALUES (
  'John Doe',
  '2000-05-15',
  '123 Main Street, Cityville',
  10,
  'Jane Doe',
  '123-456-7890',
  '987-654-3210',
  5,
  85.5,
  92.3
);
INSERT INTO student (
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
  attendance_percentage
) VALUES (
  'Alice Smith',
  '2002-08-21',
  '456 Oak Avenue, Townsville',
  11,
  'Bob Smith',
  '555-123-4567',
  '789-321-6540',
  '2021-09-01',
  '2024-06-15',
  6,
  91.2,
  94.8
);
