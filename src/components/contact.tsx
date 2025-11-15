"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", service: "", message: "" })
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Lets Work Together</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Ready to bring your creative vision to life? Get in touch with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="space-y-6 sm:space-y-8">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm sm:text-base">Email</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">hello@creativestudio.com</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm sm:text-base">Phone</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">+254 713 486 785
                    <br />
                                                                            +254 769 163 763
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm sm:text-base">Location</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    ** Building, 3rd Floor, Parklands, Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              >
                <option value="">Select a service</option>
                <option value="design">Graphic Design</option>
                <option value="marketing">Digital Marketing</option>
                <option value="web">Web Development</option>
                <option value="print">Printing Services</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition transform hover:scale-105 text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
