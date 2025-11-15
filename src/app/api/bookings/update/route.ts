import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAdminToken } from "@/lib/admin-auth"

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { appointmentId, status } = body

    if (!appointmentId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await query("UPDATE appointments SET status = ? WHERE id = ?", [status, appointmentId])

    return NextResponse.json({ success: true, message: "Appointment updated" }, { status: 200 })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}
