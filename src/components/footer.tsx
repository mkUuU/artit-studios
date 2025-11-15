import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">CreativeStudio</h3>
            <p className="text-sm sm:text-base text-background/80">
              Transforming ideas into exceptional creative experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-background/80 text-sm sm:text-base">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Printing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-background/80 text-sm sm:text-base">
              <li>
                <Link href="#" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
            <div className="flex gap-3 sm:gap-4">
              <Link href="#" className="hover:text-background transition">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-background transition">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-background transition">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-background transition">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6 sm:pt-8 text-center text-sm sm:text-base text-background/80">
          <p>&copy; 2025 Artit Creative Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
