"use client"

import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Artit Creative <br /> Studio
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="#services" className="text-foreground hover:text-primary transition">
            Services
          </Link>
          <Link href="#portfolio" className="text-foreground hover:text-primary transition">
            Portfolio
          </Link>
          <Link href="#about" className="text-foreground hover:text-primary transition">
            About
          </Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition">
            Contact
          </Link>
          <Link href="/booking/status" className="text-foreground hover:text-primary transition text-sm">
            Check Status
          </Link>
          <Link
            href="/booking"
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            📅 Book Now
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
          {isOpen ? "✕" : "☰"}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="#services" className="text-foreground hover:text-primary transition">
                Services
              </Link>
              <Link href="#portfolio" className="text-foreground hover:text-primary transition">
                Portfolio
              </Link>
              <Link href="#about" className="text-foreground hover:text-primary transition">
                About
              </Link>
              <Link href="#contact" className="text-foreground hover:text-primary transition">
                Contact
              </Link>
              <Link href="/booking/status" className="text-foreground hover:text-primary transition">
                Check Status
              </Link>
              <Link
                href="/booking"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2 w-fit"
              >
                📅 Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
