import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your brand, goals, and target audience.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We develop a comprehensive strategy tailored to your unique needs.",
  },
  {
    number: "03",
    title: "Design",
    description: "Our creative team brings your vision to life with stunning designs.",
  },
  {
    number: "04",
    title: "Development",
    description: "We build and optimize for performance, speed, and user experience.",
  },
  {
    number: "05",
    title: "Launch",
    description: "We deploy your project and ensure everything runs smoothly.",
  },
  {
    number: "06",
    title: "Support",
    description: "Ongoing support and optimization to keep your project thriving.",
  },
]

export default function Process() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Our Process</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            A proven methodology that delivers exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-xl p-6 sm:p-8 border border-border h-full">
                <div className="text-4xl sm:text-5xl font-bold text-primary/20 mb-3 sm:mb-4">{step.number}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
