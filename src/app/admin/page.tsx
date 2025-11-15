"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Appointment {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service: string
  appointment_date: string
  appointment_time: string
  project_details: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string
}

const SERVICES: Record<string, string> = {
  "graphic-design": "Graphic Design",
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  printing: "Printing Services",
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminToken, setAdminToken] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<"pending" | "confirmed" | "completed" | "cancelled">("pending")
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      setAdminToken(token)
      setIsAuthenticated(true)
      loadAppointments(token)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const data = await response.json()
      setAdminToken(data.token)
      localStorage.setItem("adminToken", data.token)
      setIsAuthenticated(true)
      setEmail("")
      setPassword("")
      loadAppointments(data.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const loadAppointments = async (token: string) => {
    try {
      const response = await fetch("/api/bookings/all", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error("Failed to load appointments")

      const data = await response.json()
      setAppointments(data)
    } catch (err) {
      console.error("Load error:", err)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAdminToken("")
    localStorage.removeItem("adminToken")
    setEmail("")
    setPassword("")
  }

  const handleStatusChange = async (id: string, newStatus: "pending" | "confirmed" | "completed" | "cancelled") => {
    try {
      const response = await fetch("/api/bookings/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ appointmentId: id, status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update")

      setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
      setEditingId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      const response = await fetch(`/api/bookings/delete?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      })

      if (!response.ok) throw new Error("Failed to delete")

      setAppointments((prev) => prev.filter((apt) => apt.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    }
  }

  const filteredAppointments = filter === "all" ? appointments : appointments.filter((apt) => apt.status === filter)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
              🔐
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-center mb-8">Enter your credentials to access</p>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <Link href="/" className="block text-center mt-6 text-cyan-400 hover:text-cyan-300">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage all appointments and bookings</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition flex items-center gap-2"
          >
            🚪 Logout
          </button>
        </div>

        {error && <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm">Total Appointments</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {appointments.filter((a) => a.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">
              {appointments.filter((a) => a.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "completed").length}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                filter === status
                  ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">No appointments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{apt.client_name}</p>
                          <p className="text-sm text-gray-600">{apt.client_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{SERVICES[apt.service]}</td>
                      <td className="px-6 py-4 text-gray-700">
                        <p>{new Date(apt.appointment_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{apt.appointment_time}</p>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === apt.id ? (
                          <select
                            value={editStatus}
                            onChange={(e) =>
                              setEditStatus(
                                e.target.value as "pending" | "confirmed" | "completed" | "cancelled"
                              )
                            }
                            className="px-3 py-1 border-2 border-cyan-400 rounded-lg text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[apt.status]}`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {editingId === apt.id ? (
                            <>
                              <button
                                onClick={() => handleStatusChange(apt.id, editStatus)}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-400 transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingId(apt.id)
                                  setEditStatus(apt.status)
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(apt.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
