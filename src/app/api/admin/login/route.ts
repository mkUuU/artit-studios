import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"
import { saveAdminToken } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const results = await query("SELECT * FROM admin_users WHERE email = ?", [email])

    const rows = Array.isArray(results) ? (results as any[]) : []

    if (rows.length === 0 || !verifyPassword(password, rows[0].password_hash)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken()
    // Store token with expiration (24 hours)
    saveAdminToken(token, Date.now() + 24 * 60 * 60 * 1000)

    return NextResponse.json({ success: true, token, message: "Login successful" }, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
