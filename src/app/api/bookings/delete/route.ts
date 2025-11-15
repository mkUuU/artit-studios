import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAdminToken } from "@/lib/admin-auth"

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const appointmentId = searchParams.get("id")

    if (!appointmentId) {
      return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 })
    }

    await query("DELETE FROM appointments WHERE id = ?", [appointmentId])

    return NextResponse.json({ success: true, message: "Appointment deleted" }, { status: 200 })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 })
  }
}
