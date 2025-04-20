"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import Link from "next/link"

export function UserAuthStatus() {
  const { currentUser, signOut, loading } = useAuth()

  if (loading) {
    return <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
  }

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium">
            {currentUser.displayName || currentUser.email?.split("@")[0] || "User"}
          </span>
          <button onClick={signOut} className="text-xs text-gray-500 hover:text-[#635bff] flex items-center gap-1">
            Sign out
            <LogOut className="w-3 h-3" />
          </button>
        </div>
        <div className="h-9 w-9 rounded-full bg-[#635bff] text-white flex items-center justify-center">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL || "/placeholder.svg"}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
      </div>
    )
  }

  return (
    <Link href="/login">
      <Button variant="outline" className="rounded-full">
        Sign In
      </Button>
    </Link>
  )
}
