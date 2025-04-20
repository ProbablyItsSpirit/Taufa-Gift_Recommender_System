"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Bookmark, Truck, CreditCard, ShoppingCart, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { findGiftById } from "@/lib/gift-recommendations"
import Link from "next/link"

export default function RecommendedGiftPage() {
  const [loading, setLoading] = useState(true)
  const [gift, setGift] = useState<any>(null)
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      const foundGift = findGiftById(id)
      if (foundGift) {
        setGift(foundGift)
      } else {
        // If gift not found, redirect to the main recommendation page
        router.push("/recommended")
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id, router])

  const handleSaveGift = () => {
    toast({
      title: "Gift Saved!",
      description: "Item saved to your wishlist",
      duration: 3000,
    })
  }

  const handleBuyNow = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully",
        duration: 3000,
      })
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0EFFA]">
        <div className="w-16 h-16 border-4 border-[#635bff] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-[#635bff]">Finding the perfect gift for you...</p>
      </div>
    )
  }

  if (!gift) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0EFFA]">
        <p className="text-lg font-medium text-red-500">Gift recommendation not found</p>
        <Link href="/personalisation">
          <Button className="mt-4">Try another recommendation</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#F0EFFA] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/personalisation" className="inline-flex items-center text-[#635bff] mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Personalisation
        </Link>

        <div className="bg-white p-4 rounded-lg mb-6">
          <p className="text-gray-600 italic">&quot;{gift.query}&quot;</p>
        </div>

        <div className="product-container grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <div className="product-gallery animate-fade-in">
            <div className="main-image bg-white p-8 rounded-xl shadow-md flex items-center justify-center h-[500px] relative overflow-hidden">
              <div className="zoom-container transition-transform duration-300 hover:scale-125">
                <img
                  src={gift.image || "/placeholder.svg"}
                  alt={gift.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="product-info animate-fade-in delay-200">
            <div>
              <h5 className="text-[#635bff] text-sm uppercase font-medium tracking-wider">Gift Details</h5>
              <h1 className="text-3xl font-bold mt-2 mb-4">{gift.title}</h1>
            </div>

            <div className="product-details border-t border-gray-200 py-4 space-y-2">
              {Object.entries(gift.details).map(([key, value]) => (
                <div className="flex" key={key}>
                  <div className="w-36 text-gray-500">{key}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>

            <div className="price-container flex items-center gap-4 my-6">
              <span className="text-3xl font-bold">{gift.price}</span>
              {gift.originalPrice && <span className="text-xl text-gray-500 line-through">{gift.originalPrice}</span>}
              {gift.discount && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {gift.discount} Off
                </span>
              )}
            </div>

            <div className="features-list mb-6">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {gift.features.map((feature: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="action-buttons flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 py-6 text-base">
                Add to Cart
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Button
                className="flex-1 flex items-center justify-center gap-2 py-6 text-base bg-green-600 hover:bg-green-700 animate-pulse"
                onClick={handleBuyNow}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Buy Now
                    <CreditCard className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <div
              className="action-card flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm mb-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={handleSaveGift}
            >
              <div className="action-icon w-12 h-12 rounded-full bg-[rgba(99,91,255,0.1)] flex items-center justify-center text-[#635bff]">
                <Bookmark className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Save the gift</h3>
                <p className="text-gray-500 text-sm">For later buying, one can also save the gift.</p>
              </div>
              <Button className="bg-[#635bff] hover:bg-[#5147fc]">
                Save gift
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="action-card flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="action-icon w-12 h-12 rounded-full bg-[rgba(99,91,255,0.1)] flex items-center justify-center text-[#635bff]">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="text-gray-500 text-sm">Free shipping on all orders over $30.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
