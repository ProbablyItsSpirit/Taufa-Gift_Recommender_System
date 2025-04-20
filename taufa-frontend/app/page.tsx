import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="bg-[#F0EFFA] min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row justify-between items-center px-6 lg:px-24 py-16">
        {/* Left Text Content */}
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <p className="inline-block px-4 py-2 rounded-full font-semibold tracking-wide text-sm bg-[rgba(99,91,255,0.1)] text-[#635bff]">
            Solutions for finding ideal gifts!
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Taufa – your{" "}
            <span className="relative z-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-[#FFD166] after:opacity-30 after:-z-10">
              personalised
            </span>
            <br />
            gift recommender
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Confused what to gift your loved ones? Taufa&apos;s got you covered — smart, thoughtful, and just right.
          </p>
          <Link href="/personalisation" className="inline-block">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#8f89ff] to-[#635bff] hover:from-[#7b76ff] hover:to-[#5147fc] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-full px-8 py-6 text-lg flex items-center justify-center gap-2 max-w-xs animate-pulse"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {/* User Avatars + Trust Badge */}
          <div className="flex items-center space-x-3 pt-6">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                src="/placeholder.svg?height=40&width=40"
                alt="User 1"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                src="/placeholder.svg?height=40&width=40"
                alt="User 2"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                src="/placeholder.svg?height=40&width=40"
                alt="User 3"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                src="/placeholder.svg?height=40&width=40"
                alt="User 4"
              />
            </div>
            <span className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm text-gray-700 ml-2">
              +1000 happy users
            </span>
          </div>
        </div>

        {/* Right Image/Illustration */}
        <div className="mb-12 lg:mb-0">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Gift Boxes"
              className="w-[300px] lg:w-[400px] h-auto object-contain rounded-xl shadow-sm transition-transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* How Taufa Works Section */}
      <section className="bg-white px-10 lg:px-24 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How Taufa Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {/* Step 1 */}
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-[#f5f7fa] border-t-4 border-[#FF6B6B]">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-[rgba(255,107,107,0.1)] flex items-center justify-center">
                <span className="text-[#FF6B6B] text-2xl">1</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Tell Us About Them</h3>
            <p className="text-gray-600">Share their interests, age, and relationship. We take care of the rest.</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-[#f5f7fa] border-t-4 border-[#4ECDC4]">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-[rgba(78,205,196,0.1)] flex items-center justify-center">
                <span className="text-[#4ECDC4] text-2xl">2</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-600">Our AI recommends the best gift options tailored just for them.</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-[#f5f7fa] border-t-4 border-[#FFD166]">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-[rgba(255,209,102,0.1)] flex items-center justify-center">
                <span className="text-[#FFD166] text-2xl">3</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Make Someone Smile</h3>
            <p className="text-gray-600">
              Order the gift or keep it as a surprise idea. Either way, you&apos;re winning!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
