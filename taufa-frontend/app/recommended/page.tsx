"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllGiftRecommendations } from "@/lib/gift-recommendations"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RecommendedPage() {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      const allRecommendations = getAllGiftRecommendations()
      setRecommendations(allRecommendations)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0EFFA]">
        <div className="w-16 h-16 border-4 border-[#635bff] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-[#635bff]">Loading gift recommendations...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#F0EFFA] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Gift Recommendations</h1>
        <p className="text-gray-600 mb-8">Browse our personalized gift recommendations for every occasion</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((gift, index) => (
            <Card
              key={gift.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-2 text-lg">{gift.title}</CardTitle>
                <CardDescription className="line-clamp-1">{gift.query.split(",")[0]}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-48 bg-white rounded-md mb-4 flex items-center justify-center">
                  <img
                    src={gift.image || "/placeholder.svg"}
                    alt={gift.title}
                    className="max-h-full max-w-full object-contain p-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold">{gift.price}</p>
                    {gift.originalPrice && <p className="text-sm text-gray-500 line-through">{gift.originalPrice}</p>}
                  </div>
                  {gift.discount && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {gift.discount} Off
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/recommended/${gift.id}`} className="w-full">
                  <Button className="w-full bg-[#635bff] hover:bg-[#5147fc]">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
