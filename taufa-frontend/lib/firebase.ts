"use client"

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth"
import { useEffect, useState } from "react"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKw289LBRIK5rn8dKDu6EPcrdOw313xrs",
  authDomain: "taufa-f060b.firebaseapp.com",
  projectId: "taufa-f060b",
  storageBucket: "taufa-f060b.firebasestorage.app",
  messagingSenderId: "615934410783",
  appId: "1:615934410783:web:5b14121df6c1d72a01552a",
  measurementId: "G-REHHGP8FER",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics - only in browser environment
let analytics: any = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Initialize Firebase Authentication
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch (error) {
    console.error("Error signing in with Google: ", error)
    throw error
  }
}

// Sign up with email/password
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error("Error signing up with email: ", error)
    throw error
  }
}

// Sign in with email/password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error("Error signing in with email: ", error)
    throw error
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out: ", error)
    throw error
  }
}

// Custom hook to get the current user
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { currentUser, loading }
}

export { auth, app, analytics }
