import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 sm:mb-6 inline-block">
          <div className="gradient-cyan-pink px-3 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-semibold">
            Welcome to Creative Excellence
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance">
          <span className="gradient-text">Design. Market. Build. Print.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-balance">
          We transform your vision into stunning digital and print experiences. From graphic design to web development,
          we deliver creative solutions that captivate and convert.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/booking"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 text-sm sm:text-base text-center"
          >
            Book Your Appointment
          </Link>
          <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition text-sm sm:text-base">
            View Our Work
          </button>
        </div>
      </div>
    </section>
  )
}
