import Link from "next/link"
import { Gift, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#e0defb] text-black">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Taufa Logo and Tagline */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Gift className="w-6 h-6 text-[#635bff]" />
              <span className="text-xl font-bold text-[#635bff]">Taufa</span>
            </div>
            <p className="text-sm text-gray-600">Helping you make memories with the perfect gift – every time.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#635bff] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/personalisation" className="hover:text-[#635bff] transition">
                  Personalisation
                </Link>
              </li>
              <li>
                <Link href="/recommended" className="hover:text-[#635bff] transition">
                  Gift Details
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#635bff] transition">
                  User Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay in the loop</h3>
            <p className="text-sm text-gray-600 mb-4">Get updates about new features & gifting ideas.</p>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent"
              />
              <Button size="icon" className="bg-[#635bff] text-white rounded-full hover:bg-[#5147fc] transition">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-black/10 pt-6 text-sm text-center text-gray-600">
          © 2025 Taufa. Made with efforts for thoughtful gifting.
        </div>
      </div>
    </footer>
  )
}
