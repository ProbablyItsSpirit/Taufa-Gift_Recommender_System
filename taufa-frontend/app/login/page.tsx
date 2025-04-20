"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Gift,
  Heart,
  Cake,
  Calendar,
  Sparkles,
  PartyPopper,
  Rocket,
  Package,
  Star,
  ArrowRight,
  LogIn,
  Mail,
  Facebook,
  CheckCircle,
  Shield,
  Zap,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Import the useAuth hook at the top
import { useAuth } from "@/contexts/auth-context"

// Add the useAuth hook to the component
export default function LoginPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { signUp, signIn, signInWithGoogle } = useAuth()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  // Replace the handleSubmit function with this:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = true

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      })
      isValid = false
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      isValid = false
    }

    if (!validatePassword(password)) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      isValid = false
    }

    if (isValid) {
      setIsSubmitting(true)

      try {
        const user = await signUp(email, password)
        if (user) {
          setIsSubmitting(false)
          setIsSuccess(true)

          // Redirect after success message
          setTimeout(() => {
            router.push("/")
          }, 2000)
        } else {
          setIsSubmitting(false)
        }
      } catch (error) {
        setIsSubmitting(false)
      }
    }
  }

  // Add a function to handle Google sign in
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    try {
      const user = await signInWithGoogle()
      if (user) {
        router.push("/")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add a function to handle sign in
  const handleSignIn = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const user = await signIn(email, password)
      if (user) {
        router.push("/")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#F0EFFA] min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#635bff] text-white rounded-full font-medium mb-6 animate-pulse">
            <ArrowRight className="w-4 h-4" />
            <span>Join our community</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#635bff] to-[#8f89ff] text-transparent bg-clip-text">
            Ready to join our community?
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with amazing people and find perfect gifts today!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in delay-100">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Gift className="w-6 h-6 text-white" />, active: true },
                  { icon: <Heart className="w-6 h-6 text-gray-400" />, active: false },
                  { icon: <Cake className="w-6 h-6 text-white" />, active: true },
                  { icon: <Calendar className="w-6 h-6 text-white" />, active: true },
                  { icon: <Sparkles className="w-6 h-6 text-gray-400" />, active: false },
                  { icon: <PartyPopper className="w-6 h-6 text-white" />, active: true },
                  { icon: <Rocket className="w-6 h-6 text-gray-400" />, active: false },
                  { icon: <Package className="w-6 h-6 text-white" />, active: true },
                  { icon: <Star className="w-6 h-6 text-gray-400" />, active: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                      item.active
                        ? "bg-gradient-to-r from-[#8f89ff] to-[#635bff]"
                        : "bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]"
                    }`}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-[#f5f7fa] rounded-lg">
                <div className="mb-4 text-center">
                  <div className="testimonial italic text-gray-600">
                    "Taufa helped me find the perfect birthday gift for my friend. The personalization options are
                    amazing!"
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold">Khyati</h4>
                  <div className="flex items-center justify-center mt-2 text-[#635bff]">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-xs">Verified User</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 animate-fade-in delay-200">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-[rgba(99,91,255,0.1)] rounded-full text-[#635bff]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Secure Sign Up</h4>
                  <p className="text-sm text-gray-500">Your data is protected with industry-standard encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-[rgba(99,91,255,0.1)] rounded-full text-[#635bff]">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Quick Setup</h4>
                  <p className="text-sm text-gray-500">Get started in less than 2 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="p-2 bg-[rgba(99,91,255,0.1)] rounded-full text-[#635bff]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Join Community</h4>
                  <p className="text-sm text-gray-500">Connect with other gift enthusiasts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Success!</h2>
                  <p className="mb-6 text-gray-600">Check your email to complete registration</p>
                  <Link href="/">
                    <Button className="bg-green-500 hover:bg-green-600">Return to Home</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full p-3 rounded-lg"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full p-3 rounded-lg"
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Create Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full p-3 rounded-lg"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#8f89ff] to-[#635bff] hover:from-[#7b76ff] hover:to-[#5147fc] py-6 rounded-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-3 py-6 rounded-lg"
                      onClick={handleSignIn}
                      disabled={isSubmitting}
                    >
                      Sign In Instead
                      <LogIn className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="flex items-center my-6">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="px-3 text-sm text-gray-500">or continue with</span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center py-6"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Google
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center py-6">
                        <Facebook className="w-5 h-5 mr-2" />
                        Facebook
                      </Button>
                    </div>

                    <div className="text-center mt-6">
                      <p className="text-xs text-gray-500">
                        By signing up, you agree to our
                        <Link href="#" className="text-[#635bff] hover:underline ml-1">
                          Terms of Service
                        </Link>{" "}
                        and
                        <Link href="#" className="text-[#635bff] hover:underline ml-1">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 shadow-md animate-fade-in delay-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Your Progress</h3>
                <span className="text-sm text-gray-500">Step 1 of 3</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#635bff] flex items-center justify-center text-white">
                      <span>1</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="text-sm font-medium mt-2 text-[#635bff]">Sign Up</span>
                </div>

                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div className="h-full w-0 bg-[#635bff] transition-all duration-500"></div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <span>2</span>
                  </div>
                  <span className="text-sm font-medium mt-2 text-gray-500">Profile</span>
                </div>

                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <span>3</span>
                  </div>
                  <span className="text-sm font-medium mt-2 text-gray-500">Connect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
