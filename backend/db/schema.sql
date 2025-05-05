-- Drop existing tables in correct order due to foreign keys
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS companies;

-- Companies table
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  company_id INT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Questions table
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Answers table
CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_value TINYINT NOT NULL CHECK (answer_value BETWEEN 1 AND 5),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Insert companies
INSERT INTO companies (name) VALUES
('TechCorp'),
('HealthGroup');

-- Insert users (admin and regular), connected to companies
INSERT INTO users (first_name, last_name, email, password, role, company_id) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$LNxeqdrCANv3aaebZRveyu8GilpDKn7pCEF2LtU7Ta0ajl0FTDuI.', 'admin', 1),
('Admin', 'User', 'admin2@example.com', '$2b$10$LNxeqdrCANv3aaebZRveyu8GilpDKn7pCEF2LtU7Ta0ajl0FTDuI.', 'admin', 2),
('Jane', 'Doe', 'user@example.com', '$2b$10$JB1pdro3jxWVaCaHnbggqeHuRSTaqnaAuT7jwQHSjKd.hJNenyxEW', 'user', 1),
('Jane', 'Doe', 'user2@example.com', '$2b$10$JB1pdro3jxWVaCaHnbggqeHuRSTaqnaAuT7jwQHSjKd.hJNenyxEW', 'user', 2);
