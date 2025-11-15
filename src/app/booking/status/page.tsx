"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: "pending" | "confirmed" | "completed"
  createdAt: string
}

const SERVICES: Record<string, string> = {
  "graphic-design": "Graphic Design",
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  printing: "Printing Services",
}

const STATUS_CONFIG = {
  pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending", icon: "⏳" },
  confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed", icon: "✓" },
  completed: { color: "bg-blue-100 text-blue-800", label: "Completed", icon: "✓" },
}

export default function StatusPage() {
  const [bookingId, setBookingId] = useState("")
  const [email, setEmail] = useState("")
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [searched, setSearched] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    setNotFound(false)

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    const found = appointments.find((apt: Appointment) => apt.id === bookingId && apt.email === email)

    if (found) {
      setAppointment(found)
    } else {
      setNotFound(true)
      setAppointment(null)
    }
  }

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-background pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Check Appointment Status</h1>
          <p className="text-gray-300 text-lg">Enter your booking ID and email to view your appointment</p>
        </div>

        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Booking ID *</label>
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                placeholder="Enter your booking ID"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-linear-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              🔍 Search Appointment
            </button>
          </div>
        </form>

        {notFound && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 flex items-start gap-4">
            <span className="text-2xl">⚠</span>
            <div>
              <h3 className="font-bold text-red-900 mb-2">Appointment Not Found</h3>
              <p className="text-red-700">Please check your booking ID and email address and try again.</p>
            </div>
          </div>
        )}

        {appointment && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
              <div
                className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${getStatusConfig(appointment.status).color}`}
              >
                {getStatusConfig(appointment.status).icon}
                {getStatusConfig(appointment.status).label}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">👤</span>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{appointment.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✉</span>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{appointment.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">📱</span>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{appointment.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">📅</span>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">🕐</span>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{appointment.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✨</span>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold text-gray-900">{SERVICES[appointment.service]}</p>
                  </div>
                </div>
              </div>
            </div>

            {appointment.message && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Message</p>
                <p className="text-gray-700">{appointment.message}</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Booking ID:</span> {appointment.id}
              </p>
            </div>

            <Link
              href="/booking"
              className="block mt-8 px-6 py-3 bg-linear-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition text-center"
            >
              Book Another Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
