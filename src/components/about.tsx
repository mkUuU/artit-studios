import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">About Our Studio</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">
              We are a team of passionate creatives dedicated to transforming ideas into exceptional visual experiences.
              With over a decade of combined experience, we have helped hundreds of brands tell their stories.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              Our approach combines strategic thinking with creative excellence, ensuring every project delivers
              measurable results and lasting impact.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">75+</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">32+</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">2+</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
            <div className="absolute inset-0 gradient-pink-purple opacity-20"></div>
            <Image
              src="/placeholder.svg"
              alt="Our team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
