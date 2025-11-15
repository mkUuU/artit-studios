import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, message } = body

    // Validate input
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const appointmentId = uuidv4()

    // Insert into database
    await query(
      "INSERT INTO appointments (id, client_name, client_email, client_phone, service, appointment_date, appointment_time, project_details, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [appointmentId, name, email, phone, service, date, time, message, "pending"],
    )

    // Send confirmation email to client
    await sendBookingConfirmation(email, name, appointmentId, service, date, time)

    // Send notification to admin
    await sendAdminNotification(appointmentId, name, service, date, time)

    return NextResponse.json(
      {
        success: true,
        appointmentId,
        message: "Booking confirmed. Check your email for details.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
