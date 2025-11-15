import nodemailer from "nodemailer"

// Create email transporter (configure based on your email service)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendBookingConfirmation(
  clientEmail: string,
  clientName: string,
  appointmentId: string,
  service: string,
  date: string,
  time: string,
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: clientEmail,
      subject: "Booking Confirmation - Creative Studio",
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Hi ${clientName},</p>
        <p>Your appointment has been successfully booked.</p>
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Booking ID:</strong> ${appointmentId}</li>
        </ul>
        <p>You can check your appointment status anytime using your booking ID and email.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/status">Check Status</a></p>
        <p>Thank you!</p>
      `,
    })
    console.log(`Confirmation email sent to ${clientEmail}`)
  } catch (error) {
    console.error("Email error:", error)
  }
}

export async function sendAdminNotification(
  appointmentId: string,
  clientName: string,
  service: string,
  date: string,
  time: string,
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking - Creative Studio",
      html: `
        <h2>New Booking Received</h2>
        <h3>Details:</h3>
        <ul>
          <li><strong>Client:</strong> ${clientName}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Booking ID:</strong> ${appointmentId}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">View in Dashboard</a></p>
      `,
    })
    console.log(`Admin notification sent to ${process.env.ADMIN_EMAIL}`)
  } catch (error) {
    console.error("Admin email error:", error)
  }
}

export async function sendContactResponse(clientEmail: string, clientName: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: clientEmail,
      subject: "Message Received - Creative Studio",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${clientName},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Creative Studio Team</p>
      `,
    })
  } catch (error) {
    console.error("Contact email error:", error)
  }
}
