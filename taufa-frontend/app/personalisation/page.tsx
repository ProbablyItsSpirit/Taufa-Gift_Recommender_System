"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Cake,
  Heart,
  Gift,
  SparklesIcon as Champagne,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Sparkles,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { giftRecommendations } from "@/lib/gift-recommendations"
import { Input } from "@/components/ui/input"

// Example gift recommendation queries
const EXAMPLE_QUERIES = [
  "Recommend me a Toy Car",
  "Recommend a thoughtful gift for my 22-year-old cousin who loves photography under ₹2000",
  "I want to buy a skincare gift set for my 30-year-old sister-in-law, within ₹1500",
  "Suggest a fun gift for my dad who loves gardening, budget ₹1200",
  "I need a gift for a 19-year-old girl who's into anime, under ₹1000",
  "Looking for a present for my 25-year-old friend who travels a lot, under ₹1800",
  "Suggest something classy for a 28-year-old man who likes tech gadgets, under ₹2500",
  "Recommend a birthday gift for my aunt who enjoys cooking, under ₹1500",
  "I want a unique gift for my mom who does crochet, under ₹1000",
  "Gift ideas for a 20-year-old guy who plays guitar, budget ₹1700",
  "I need something cozy and cute for my 23-year-old girlfriend, under ₹2000",
  "Suggest a gift for a 40-year-old aunt who's into skincare and wellness",
  "Looking for something quirky for a 21-year-old who loves memes, under ₹800",
  "Need a spiritual gift for my grandmother under ₹1200",
  "Recommend a self-care gift box for a 27-year-old working woman, within ₹1800",
  "I want to buy something meaningful for my 60-year-old uncle who loves history",
  "Suggest something home-decor related for my bhabhi under ₹1500",
  "Recommend a gym accessory gift for a 24-year-old fitness enthusiast",
  "Find me a gift for a book-lover aunt aged around 35, budget ₹900",
  "I want a gift set for my wife's birthday, she's 29 and loves fragrances",
  "Need a cool yet affordable gift for a college student under ₹1000",
  "Gift for a 26-year-old woman who loves journaling and stationery, budget ₹700",
  "Suggest a classy gift for my cousin brother who just got a job, under ₹2000",
  "Find a practical gift for a 38-year-old mom of two, within ₹1300",
  "I want something sweet and relaxing for my maasi, under ₹1500",
  "Recommend a stylish accessory for a 30-year-old fashionista under ₹1000",
]

export default function PersonalisationPage() {
  const [selectedOccasion, setSelectedOccasion] = useState("Birthday")
  const [selectedBudget, setSelectedBudget] = useState("₹1000-₹5000")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showExamples, setShowExamples] = useState(true) // Changed to true by default
  const [filteredExamples, setFilteredExamples] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Filter examples based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = EXAMPLE_QUERIES.filter((query) => query.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredExamples(filtered)
    } else {
      setFilteredExamples(EXAMPLE_QUERIES)
    }
  }, [searchTerm])

  const handleOccasionSelect = (occasion: string) => {
    setSelectedOccasion(occasion)
  }

  const handleBudgetSelect = (budget: string) => {
    setSelectedBudget(budget)
  }

  const handleExampleClick = (example: string) => {
    setDescription(example)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Update the handleSubmit function to redirect to the correct recommendation page based on the description
  const handleSubmit = () => {
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please tell us more about the person you're shopping for.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Find the matching gift recommendation
    const matchingGift = giftRecommendations.find((gift) => gift.query === description)

    // Simulate loading and then redirect
    setTimeout(() => {
      if (matchingGift) {
        // Redirect to the specific recommendation page
        router.push(`/recommended/${matchingGift.id}`)
      } else {
        // If no exact match, redirect to the default recommendation page
        router.push("/recommended")
      }
    }, 2000)
  }

  return (
    <div className="bg-[#F0EFFA] min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#4ECDC4] animate-fade-in">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3">Tell us about them</h2>
                <p className="text-gray-600">
                  Share details about the person you're shopping for to get personalized gift recommendations.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Occasion</label>
                <div className="flex flex-wrap">
                  <div
                    className={`input-pill ${selectedOccasion === "Birthday" ? "input-pill-active" : ""}`}
                    onClick={() => handleOccasionSelect("Birthday")}
                  >
                    <Cake className="w-4 h-4 mr-1" />
                    Birthday
                  </div>
                  <div
                    className={`input-pill ${selectedOccasion === "Anniversary" ? "input-pill-active" : ""}`}
                    onClick={() => handleOccasionSelect("Anniversary")}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Anniversary
                  </div>
                  <div
                    className={`input-pill ${selectedOccasion === "Christmas" ? "input-pill-active" : ""}`}
                    onClick={() => handleOccasionSelect("Christmas")}
                  >
                    <Gift className="w-4 h-4 mr-1" />
                    Christmas
                  </div>
                  <div
                    className={`input-pill ${selectedOccasion === "Other" ? "input-pill-active" : ""}`}
                    onClick={() => handleOccasionSelect("Other")}
                  >
                    <Champagne className="w-4 h-4 mr-1" />
                    Other
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Budget Range</label>
                <div className="flex flex-wrap">
                  <div
                    className={`input-pill ${selectedBudget === "₹100-₹1000" ? "input-pill-active" : ""}`}
                    onClick={() => handleBudgetSelect("₹100-₹1000")}
                  >
                    ₹100-₹1000
                  </div>
                  <div
                    className={`input-pill ${selectedBudget === "₹1000-₹5000" ? "input-pill-active" : ""}`}
                    onClick={() => handleBudgetSelect("₹1000-₹5000")}
                  >
                    ₹1000-₹5000
                  </div>
                  <div
                    className={`input-pill ${selectedBudget === "₹5000-₹10000" ? "input-pill-active" : ""}`}
                    onClick={() => handleBudgetSelect("₹5000-₹10000")}
                  >
                    ₹5000-₹10000
                  </div>
                  <div
                    className={`input-pill ${selectedBudget === "₹10000+" ? "input-pill-active" : ""}`}
                    onClick={() => handleBudgetSelect("₹10000+")}
                  >
                    ₹10000+
                  </div>
                </div>
              </div>

              <div className="mb-6 relative">
                <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                  Tell us more details
                </label>
                <div className="relative">
                  <Textarea
                    id="description"
                    ref={textareaRef}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-[#635bff] focus:ring focus:ring-opacity-40 focus:ring-[#635bff] focus:outline-none"
                    rows={4}
                    placeholder="Describe their interests, hobbies, age, personality..."
                  />
                  <MessageSquare className="absolute right-3 bottom-3 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Be specific for better recommendations!</p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#8f89ff] to-[#635bff] hover:from-[#7b76ff] hover:to-[#5147fc] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-full px-6 py-3 text-white font-medium flex items-center gap-2 animate-pulse"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Recommend Now
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Right side - Example queries and illustration */}
            <div className="w-full md:w-1/2 bg-[#f9f9ff] p-8 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[rgba(255,209,102,0.2)] rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[rgba(78,205,196,0.2)] rounded-full"></div>

              <div className="relative z-10 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-[#635bff]" />
                  Example Gift Queries
                </h3>

                <div className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Search example queries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 max-h-[400px] overflow-y-auto">
                  {filteredExamples.length > 0 ? (
                    filteredExamples.map((example, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-sm mb-2 border border-gray-100 transition-all duration-200 hover:border-[#635bff] hover:shadow-sm"
                        onClick={() => handleExampleClick(example)}
                      >
                        {example}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-center">No examples match your search</div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md mt-6 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="bg-[#635bff] rounded-full p-2 text-white">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Pro Tip</h4>
                    <p className="text-gray-500 text-xs">
                      Click on any example query to automatically fill the description field. You can then modify it to
                      better match your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 h-2 w-full">
            <div className="bg-[#635bff] h-full w-1/3 rounded-r-full"></div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md animate-fade-in delay-200">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-[#FFD166]" />
            Tips for better recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3 animate-slide-in delay-100">
              <div className="text-[#4ECDC4] mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p>Include their interests, hobbies, and what they're passionate about</p>
            </div>
            <div className="flex items-start gap-3 animate-slide-in delay-200">
              <div className="text-[#4ECDC4] mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p>Mention their age group and relationship to you</p>
            </div>
            <div className="flex items-start gap-3 animate-slide-in delay-300">
              <div className="text-[#4ECDC4] mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p>Share any recent life events or achievements worth celebrating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
