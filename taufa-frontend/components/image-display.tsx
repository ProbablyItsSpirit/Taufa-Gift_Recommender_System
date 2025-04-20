import Image from "next/image"

interface ImageDisplayProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageDisplay({ src, alt, width = 400, height = 400, className = "" }: ImageDisplayProps) {
  // Check if the image is a placeholder or a real image
  const isPlaceholder = src.includes("placeholder.svg")

  // If it's a placeholder, use the placeholder service
  if (isPlaceholder) {
    return <img src={src || "/placeholder.svg"} alt={alt} className={className} width={width} height={height} />
  }

  // Otherwise use Next.js Image component for optimization
  return <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className={className} />
}
