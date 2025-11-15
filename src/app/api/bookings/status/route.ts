import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const appointmentId = searchParams.get("id")
    const email = searchParams.get("email")

    if (!appointmentId || !email) {
      return NextResponse.json({ error: "Missing appointment ID or email" }, { status: 400 })
    }

    const results = await query("SELECT * FROM appointments WHERE id = ? AND client_email = ?", [appointmentId, email])
    const rows = Array.isArray(results) ? results : []

    if (rows.length === 0) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json(rows[0], { status: 200 })
  } catch (error) {
    console.error("Status check error:", error)
    return NextResponse.json({ error: "Failed to fetch appointment status" }, { status: 500 })
  }
}
