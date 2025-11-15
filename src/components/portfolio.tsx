"use client"

import { useState } from "react"
import Image from "next/image"

const portfolioItems = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "design",
    image: "/placeholder.svg?height=300&width=400",
    description: "Complete brand identity system",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "web",
    image: "/placeholder.svg?height=300&width=400",
    description: "Full-featured online store",
  },
  {
    id: 3,
    title: "Social Media Campaign",
    category: "marketing",
    image: "/placeholder.svg?height=300&width=400",
    description: "Multi-platform campaign",
  },
  {
    id: 4,
    title: "Print Collateral",
    category: "print",
    image: "/placeholder.svg?height=300&width=400",
    description: "Business cards & brochures",
  },
  {
    id: 5,
    title: "Web Application",
    category: "web",
    image: "/placeholder.svg?height=300&width=400",
    description: "SaaS dashboard interface",
  },
  {
    id: 6,
    title: "Marketing Materials",
    category: "marketing",
    image: "/placeholder.svg?height=300&width=400",
    description: "Promotional materials",
  },
]

export default function Portfolio() {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Portfolio</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Showcase of our best work across all creative disciplines
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2">
          {["all", "design", "web", "marketing", "print"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition capitalize text-sm sm:text-base whitespace-nowrap ${
                filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
                <Image
                  src={item.image || "/src/components/images/PayPal_ Wallet - Google Chrome 13_11_2025 07_40_11.png"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
