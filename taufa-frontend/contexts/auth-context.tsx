"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { signInWithGoogle, signInWithEmail, signUpWithEmail, signOutUser } from "@/lib/firebase"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<User | null>
  signUp: (email: string, password: string) => Promise<User | null>
  signInWithGoogle: () => Promise<User | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // We'll handle auth state changes in a client-side only effect
    let unsubscribe: (() => void) | null = null

    const setupAuth = async () => {
      try {
        // Dynamically import Firebase auth to ensure it only runs on client
        const { getAuth } = await import("firebase/auth")
        const { firebaseConfig } = await import("@/lib/firebase-config")
        const { initializeApp } = await import("firebase/app")

        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app)

        // Set up auth state listener
        unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user)
          setLoading(false)
        })
      } catch (error) {
        console.error("Error setting up auth:", error)
        setLoading(false)
      }
    }

    // Only run in browser environment
    if (typeof window !== "undefined") {
      setupAuth()
    } else {
      setLoading(false)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmail(email, password)
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      })
      return user
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      })
      return null
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const user = await signUpWithEmail(email, password)
      toast({
        title: "Account created successfully",
        description: "Welcome to Taufa!",
      })
      return user
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      })
      return null
    }
  }

  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle()
      toast({
        title: "Signed in successfully",
        description: "Welcome to Taufa!",
      })
      return user
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      })
      return null
    }
  }

  const logout = async () => {
    try {
      await signOutUser()
      toast({
        title: "Signed out successfully",
      })
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle: googleSignIn,
    signOut: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
