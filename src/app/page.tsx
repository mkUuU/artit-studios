import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import About from "@/components/about"
import Process from "@/components/process"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Process />
      <Contact />
      <Footer />
    </main>
  )
}
