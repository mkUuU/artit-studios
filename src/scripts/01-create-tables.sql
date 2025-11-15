-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  project_details TEXT,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (client_email),
  INDEX idx_status (status),
  INDEX idx_date (appointment_date)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(100),
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (read_status)
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Email logs table (for tracking sent emails)
CREATE TABLE IF NOT EXISTS email_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  template_type VARCHAR(100),
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('sent', 'failed') DEFAULT 'sent'
);
