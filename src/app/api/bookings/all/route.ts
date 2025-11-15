import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyAdminToken } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")

    let sql = "SELECT * FROM appointments ORDER BY appointment_date DESC"
    const params: any[] = []

    if (status) {
      sql = "SELECT * FROM appointments WHERE status = ? ORDER BY appointment_date DESC"
      params.push(status)
    }

    const results = await query(sql, params)
    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error("Fetch appointments error:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
