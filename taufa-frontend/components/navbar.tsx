"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gift, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Import the UserAuthStatus component
import { UserAuthStatus } from "@/components/user-auth-status"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-[#635bff]" />
            <span className="text-2xl font-semibold text-[#635bff]">Taufa</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 font-medium">
            <li>
              <Link
                href="/"
                className={cn(
                  "nav-link hover:text-[#635bff] transition",
                  isActive("/") && "text-[#635bff] font-semibold after:w-full",
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/personalisation"
                className={cn(
                  "nav-link hover:text-[#635bff] transition",
                  isActive("/personalisation") && "text-[#635bff] font-semibold after:w-full",
                )}
              >
                Personalisation
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={cn(
                  "nav-link hover:text-[#635bff] transition",
                  isActive("/login") && "text-[#635bff] font-semibold after:w-full",
                )}
              >
                User Profile
              </Link>
            </li>
          </ul>

          {/* Add the UserAuthStatus component to the navbar */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search gifts..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-[#635bff] focus:ring focus:ring-[#635bff] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Updated to always link to personalization page */}
            <Link href="/personalisation" className="hidden md:block">
              <Button className="bg-gradient-to-r from-[#8f89ff] to-[#635bff] hover:from-[#7b76ff] hover:to-[#5147fc] rounded-full">
                Start now
                <span className="ml-2">→</span>
              </Button>
            </Link>

            <UserAuthStatus />

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4 font-medium">
              <li>
                <Link
                  href="/"
                  className={cn(
                    "block py-2 hover:text-[#635bff] transition",
                    isActive("/") && "text-[#635bff] font-semibold",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/personalisation"
                  className={cn(
                    "block py-2 hover:text-[#635bff] transition",
                    isActive("/personalisation") && "text-[#635bff] font-semibold",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Personalisation
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className={cn(
                    "block py-2 hover:text-[#635bff] transition",
                    isActive("/login") && "text-[#635bff] font-semibold",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  User Profile
                </Link>
              </li>
            </ul>

            <div className="mt-4 relative">
              <Input
                type="text"
                placeholder="Search gifts..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:border-[#635bff] focus:ring focus:ring-[#635bff] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Updated mobile menu button to link to personalization */}
            <Link href="/personalisation" className="block mt-4">
              <Button className="w-full bg-gradient-to-r from-[#8f89ff] to-[#635bff] hover:from-[#7b76ff] hover:to-[#5147fc] rounded-full">
                Start now
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
