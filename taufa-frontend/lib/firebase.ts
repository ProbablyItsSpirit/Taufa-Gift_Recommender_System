"use client"

import { useState, useEffect } from "react"
import { firebaseConfig } from "./firebase-config"
import type { User } from "firebase/auth"

// Initialize Firebase only on the client side
let auth: any = null
let app: any = null
let googleProvider: any = null

// Flag to track initialization
let isInitialized = false

// Initialize Firebase only in browser environment
const initializeFirebase = async () => {
  if (typeof window === "undefined") return null

  if (!isInitialized) {
    try {
      const { initializeApp } = await import("firebase/app")
      const { getAuth, GoogleAuthProvider } = await import("firebase/auth")

      app = initializeApp(firebaseConfig)
      auth = getAuth(app)
      googleProvider = new GoogleAuthProvider()

      isInitialized = true
      console.log("Firebase initialized successfully")
    } catch (error) {
      console.error("Error initializing Firebase:", error)
    }
  }

  return { auth, app, googleProvider }
}

// Sign in with Google
export const signInWithGoogle = async () => {
  const firebase = await initializeFirebase()
  if (!firebase) return null

  try {
    const { signInWithPopup } = await import("firebase/auth")
    const result = await signInWithPopup(firebase.auth, firebase.googleProvider)
    return result.user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

// Sign up with email/password
export const signUpWithEmail = async (email: string, password: string) => {
  const firebase = await initializeFirebase()
  if (!firebase) return null

  try {
    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const result = await createUserWithEmailAndPassword(firebase.auth, email, password)
    return result.user
  } catch (error) {
    console.error("Error signing up with email:", error)
    throw error
  }
}

// Sign in with email/password
export const signInWithEmail = async (email: string, password: string) => {
  const firebase = await initializeFirebase()
  if (!firebase) return null

  try {
    const { signInWithEmailAndPassword } = await import("firebase/auth")
    const result = await signInWithEmailAndPassword(firebase.auth, email, password)
    return result.user
  } catch (error) {
    console.error("Error signing in with email:", error)
    throw error
  }
}

// Sign out
export const signOutUser = async () => {
  const firebase = await initializeFirebase()
  if (!firebase) return null

  try {
    const { signOut } = await import("firebase/auth")
    await signOut(firebase.auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Custom hook to get the current user
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const firebase = await initializeFirebase()
      if (!firebase) {
        setLoading(false)
        return
      }

      const unsubscribe = firebase.auth.onAuthStateChanged((user: User | null) => {
        setCurrentUser(user)
        setLoading(false)
      })

      return unsubscribe
    }

    const unsubscribePromise = initAuth()

    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) unsubscribe()
      })
    }
  }, [])

  return { currentUser, loading }
}
