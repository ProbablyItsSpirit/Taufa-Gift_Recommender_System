"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Truck, CreditCard, ShoppingCart, ChevronRight, ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { findGiftById } from "@/lib/gift-recommendations"
import Link from "next/link"

export default function ToyCarRecommendationPage() {
  const [loading, setLoading] = useState(true)
  const [gift, setGift] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      const foundGift = findGiftById("toy-car")
      if (foundGift) {
        setGift(foundGift)
      } else {
        // If gift not found, redirect to the main recommendation page
        router.push("/recommended")
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

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
        <p className="mt-4 text-lg font-medium text-[#635bff]">Finding the perfect toy car for you...</p>
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

            {/* Additional toy car images */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={`/images/toy-car/angle-${i}.png`}
                    alt={`${gift.title} view ${i}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info animate-fade-in delay-200">
            <div>
              <h5 className="text-[#635bff] text-sm uppercase font-medium tracking-wider">Gift Details</h5>
              <h1 className="text-3xl font-bold mt-2 mb-4">{gift.title}</h1>

              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
              </div>
            </div>

            <div className="my-4">
              <p className="text-gray-700">{gift.description}</p>
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

            {/* External Product Link Button */}
            {gift.productUrl && (
              <a href={gift.productUrl} target="_blank" rel="noopener noreferrer" className="block mb-6">
                <Button className="w-full bg-[#635bff] hover:bg-[#5147fc] py-6 text-base">
                  Shop on Amazon
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            )}

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
                <p className="text-gray-500 text-sm">Free shipping on all orders over ₹999.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional toy car information section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Kids Love This Toy Car</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">High-Speed Racing</h3>
              <p className="text-gray-600">
                With speeds up to 15 km/h, this car provides an exciting racing experience for children and adults
                alike.
              </p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Drift Function</h3>
              <p className="text-gray-600">
                Perform amazing drifts and stunts with the special drift function, perfect for showing off driving
                skills.
              </p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Durable Design</h3>
              <p className="text-gray-600">
                Built with high-quality ABS plastic and shock-resistant design to withstand crashes and rough play.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended age section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Perfect For Ages 6+</h2>
          <p className="text-gray-700 mb-4">
            This remote control car is designed for children aged 6 and above. The controls are intuitive enough for
            younger children to master quickly, while the advanced features like drift function provide excitement for
            older kids and even adults.
          </p>
          <p className="text-gray-700">
            Adult supervision is recommended for younger children, especially during the charging process.
          </p>
        </div>
      </div>
    </div>
  )
}
