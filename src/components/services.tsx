import { Palette, Megaphone, Code, Printer } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Logo design, branding, print materials, and visual identity that makes your brand unforgettable.",
    color: "from-primary to-secondary",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Social media campaigns, content strategy, and digital advertising that drives real results.",
    color: "from-secondary to-accent",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites, e-commerce solutions, and web applications built for performance.",
    color: "from-accent to-primary",
  },
  {
    icon: Printer,
    title: "Printing Services",
    description: "Business cards, brochures, banners, and large format printing with premium quality.",
    color: "from-primary to-accent",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Services</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Comprehensive creative solutions tailored to elevate your brand
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-primary/50 transition transform hover:scale-105 hover:shadow-lg"
              >
                <div
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition`}
                >
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
