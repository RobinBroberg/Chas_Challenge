-- Drop existing tables in correct order due to foreign keys
DROP TABLE IF EXISTS receipts;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS companies;


CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  wellness_allowance INT DEFAULT 0
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  company_id INT NOT NULL,
  remaining_wellness_allowance INT DEFAULT 0,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_value TINYINT NOT NULL CHECK (answer_value BETWEEN 1 AND 5),
  submission_id CHAR(36) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);


CREATE TABLE receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  amount INT DEFAULT NULL,
  activity VARCHAR(255) DEFAULT NULL,         
  vendor VARCHAR(255) DEFAULT NULL,
  purchase_date DATE DEFAULT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  rejection_reason TEXT DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO companies (name, wellness_allowance) VALUES
('TechCorp', 3000),
('HealthGroup', 2500);

INSERT INTO users (first_name, last_name, email, password, role, company_id, remaining_wellness_allowance) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$LNxeqdrCANv3aaebZRveyu8GilpDKn7pCEF2LtU7Ta0ajl0FTDuI.', 'admin', 1, 3000),
('Admin', 'User', 'admin2@example.com', '$2b$10$LNxeqdrCANv3aaebZRveyu8GilpDKn7pCEF2LtU7Ta0ajl0FTDuI.', 'admin', 2, 2500),
('Jane', 'Doe', 'user@example.com', '$2b$10$JB1pdro3jxWVaCaHnbggqeHuRSTaqnaAuT7jwQHSjKd.hJNenyxEW', 'user', 1, 3000),
('Jane', 'Doe', 'user2@example.com', '$2b$10$JB1pdro3jxWVaCaHnbggqeHuRSTaqnaAuT7jwQHSjKd.hJNenyxEW', 'user', 2, 2500);
