# Creative Studio Website - Production Setup Guide

## Overview

This guide walks you through setting up the complete production backend system with MySQL database, email notifications, and API routes.

## Prerequisites

- Node.js 18+ installed
- MySQL database (AWS RDS, local, or cloud provider)
- Email service account (Gmail, SendGrid, Mailgun, etc.)
- Vercel account (for deployment)

---

## Step 1: Database Setup

### Option A: AWS RDS MySQL

1. Go to AWS Console → RDS → Create Database
2. Choose MySQL engine (latest version)
3. Configure:
   - DB instance identifier: `creative-studio`
   - Master username: `admin`
   - Master password: (secure password)
   - Publicly accessible: Yes (for development)
4. Note the endpoint URL (e.g., `creative-studio.xxxxx.us-east-1.rds.amazonaws.com`)

### Option B: Local MySQL

\`\`\`bash
# Install MySQL
# macOS with Homebrew
brew install mysql

# Start MySQL
brew services start mysql

# Login
mysql -u root

# Create database
CREATE DATABASE creative_studio;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON creative_studio.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Create Tables

1. Copy the SQL from `scripts/01-create-tables.sql`
2. Run it in your MySQL client:

\`\`\`bash
mysql -h your-host -u admin -p creative_studio < scripts/01-create-tables.sql
\`\`\`

---

## Step 2: Environment Variables Setup

Create a `.env.local` file in your project root:

\`\`\`env
# Database Configuration
DB_HOST=your-database-host.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-secure-password
DB_NAME=creative_studio

# Email Configuration (Choose one option below)

# Option 1: Gmail (Recommended for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM_EMAIL=noreply@creativestudio.com

# Option 2: SendGrid
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=apikey
# SMTP_PASSWORD=your-sendgrid-api-key
# SMTP_FROM_EMAIL=noreply@creativestudio.com

# Option 3: Mailgun
# SMTP_HOST=smtp.mailgun.org
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=postmaster@your-domain.com
# SMTP_PASSWORD=your-mailgun-password
# SMTP_FROM_EMAIL=noreply@creativestudio.com

# Admin Configuration
ADMIN_EMAIL=your-admin@email.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
\`\`\`

### Getting Gmail App Password

1. Enable 2-Step Verification on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create a new app password for "Mail"
4. Use this 16-character password in `SMTP_PASSWORD`

---

## Step 3: Install Dependencies

\`\`\`bash
npm install mysql2 nodemailer uuid
\`\`\`

The `package.json` already includes these, so just run:

\`\`\`bash
npm install
\`\`\`

---

## Step 4: Create Admin User

Run this SQL to create an admin user:

\`\`\`sql
INSERT INTO admin_users (id, email, password_hash) VALUES (
  UUID(),
  'admin@creativestudio.com',
  SHA2('your-secure-password', 256)
);
\`\`\`

Or use this Node.js script in your terminal:

\`\`\`javascript
const crypto = require('crypto');
const email = 'admin@creativestudio.com';
const password = 'your-secure-password';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(`INSERT INTO admin_users (id, email, password_hash) VALUES (UUID(), '${email}', '${hash}');`);
\`\`\`

---

## Step 5: Test Locally

\`\`\`bash
npm run dev
\`\`\`

Test the endpoints:

1. **Booking**: http://localhost:3000/booking
2. **Status Check**: http://localhost:3000/booking/status
3. **Contact Form**: http://localhost:3000#contact
4. **Admin Login**: http://localhost:3000/admin

---

## Step 6: Deploy to Vercel

### Connect GitHub (Optional)

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourname/creative-studio.git
git push -u origin main
\`\`\`

### Deploy to Vercel

1. Go to vercel.com and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. In "Environment Variables", add all `.env.local` variables
5. Click "Deploy"

### Configure Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Make sure to set them for Production, Preview, and Development

---

## API Endpoints

### Bookings

**Create Appointment:**
\`\`\`
POST /api/bookings/create
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "graphic-design",
  "date": "2025-02-15",
  "time": "09:00",
  "message": "Project details..."
}
\`\`\`

**Check Status:**
\`\`\`
GET /api/bookings/status?id=UUID&email=email@example.com
\`\`\`

**Get All Appointments (Admin only):**
\`\`\`
GET /api/bookings/all
Headers: Authorization: Bearer TOKEN
\`\`\`

**Update Appointment Status (Admin only):**
\`\`\`
PUT /api/bookings/update
Headers: Authorization: Bearer TOKEN
{
  "appointmentId": "UUID",
  "status": "confirmed"
}
\`\`\`

**Delete Appointment (Admin only):**
\`\`\`
DELETE /api/bookings/delete?id=UUID
Headers: Authorization: Bearer TOKEN
\`\`\`

### Contact Form

**Send Message:**
\`\`\`
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "digital-marketing",
  "message": "Message content..."
}
\`\`\`

### Admin Authentication

**Login:**
\`\`\`
POST /api/admin/login
{
  "email": "admin@creativestudio.com",
  "password": "your-password"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "token": "token-string",
  "message": "Login successful"
}
\`\`\`

---

## Troubleshooting

### Database Connection Error

- Check credentials in `.env.local`
- Verify database is running and accessible
- For AWS RDS, check security groups allow inbound traffic

### Email Not Sending

- Verify SMTP credentials are correct
- Check spam folder
- For Gmail, ensure you're using app-specific password
- Check email logs in the database

### Admin Login Fails

- Verify admin user exists in database
- Check password hash is correctly generated
- Ensure token is properly stored and passed

### API Errors

- Check browser console for detailed errors
- Verify all environment variables are set
- Check application logs: `npm run dev` output

---

## Production Checklist

- [ ] Database backed up
- [ ] Email service configured
- [ ] Environment variables set on Vercel
- [ ] Admin credentials changed from default
- [ ] SSL certificate enabled
- [ ] Domain configured
- [ ] Email testing completed
- [ ] Admin dashboard tested
- [ ] Booking flow tested end-to-end
- [ ] Contact form tested
- [ ] Analytics configured

---

## Next Steps

1. Test booking flow with real data
2. Test email notifications
3. Set up automated backups for database
4. Monitor admin dashboard
5. Collect user feedback
6. Add payment processing (Stripe)
7. Set up automated appointment reminders
