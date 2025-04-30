
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_value TINYINT NOT NULL CHECK (answer_value BETWEEN 1 AND 10),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);


INSERT INTO questions (question_text) VALUES
('How energized do you feel today?'),
('How stressed do you feel right now?'),
('How well did you sleep last night?'),
('How motivated are you to work today?'),
('How productive do you feel today?'),
('How satisfied are you with your work environment?'),
('How clear are your work tasks today?'),
('How supported do you feel by your team/manager?'),
('How balanced do you feel between work and personal life?'),
('How confident are you about your current workload?');


INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Admin', 'User', 'admin@example.com', '$2b$10$LNxeqdrCANv3aaebZRveyu8GilpDKn7pCEF2LtU7Ta0ajl0FTDuI.', 'admin'),
('Jane', 'Doe', 'user@example.com', '$2b$10$JB1pdro3jxWVaCaHnbggqeHuRSTaqnaAuT7jwQHSjKd.hJNenyxEW', 'user');