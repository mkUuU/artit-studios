import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { sendContactResponse } from "@/lib/email"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const messageId = uuidv4()

    // Save to database
    await query("INSERT INTO contact_messages (id, name, email, service, message) VALUES (?, ?, ?, ?, ?)", [
      messageId,
      name,
      email,
      service,
      message,
    ])

    // Send confirmation email to client
    await sendContactResponse(email, name)

    // Send notification to admin
    await query("INSERT INTO email_logs (id, recipient_email, subject, template_type) VALUES (?, ?, ?, ?)", [
      uuidv4(),
      process.env.ADMIN_EMAIL,
      "New Contact Message",
      "contact",
    ])

    return NextResponse.json(
      {
        success: true,
        messageId,
        message: "Message sent successfully. We will be in touch soon.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
