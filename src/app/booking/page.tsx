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

const SERVICES = [
  { id: "graphic-design", name: "Graphic Design", duration: "1 hour" },
  { id: "digital-marketing", name: "Digital Marketing", duration: "1.5 hours" },
  { id: "web-development", name: "Web Development", duration: "2 hours" },
  { id: "printing", name: "Printing Services", duration: "1 hour" },
]

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    existingAppointments.push(appointment)
    localStorage.setItem("appointments", JSON.stringify(existingAppointments))

    setBookingId(appointment.id)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" })
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-background to-background pt-20 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-2">Your appointment has been successfully scheduled.</p>
            <p className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-pink-500 mb-8">
              Booking ID: {bookingId}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-semibold text-gray-900 mb-4">Appointment Details:</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Service:</span>{" "}
                  {SERVICES.find((s) => s.id === formData.service)?.name}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {new Date(formData.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {formData.time}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {formData.name}
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">You can check your appointment status anytime using your booking ID.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking/status"
                className="px-6 py-3 bg-linear-to-from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Check Status
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-background pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Appointment</h1>
          <p className="text-gray-300 text-lg">Schedule a consultation with our creative team</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">✉</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">📱</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                    placeholder="+254 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} ({service.duration})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Date *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">📅</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={getMinDate()}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Time *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Message</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">💬</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-400 focus:outline-none transition resize-none"
                    placeholder="Tell us about your project..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 px-6 py-4 bg-linear-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  )
}
