# How to Add Images to Your Taufa Gift Recommender

There are several ways to add images to your Taufa application. Here's a comprehensive guide:

## 1. Using Public Directory (Simplest Method)

The easiest way to add images is to place them in the `public` directory:

1. Create an `images` folder inside the `public` directory:
   \`\`\`
   public/
     images/
   \`\`\`

2. Add your image files to this folder (e.g., `gift-photo.jpg`)

3. Reference the images in your code using a path starting with `/`:
   \`\`\`jsx
   <img src="/images/gift-photo.jpg" alt="Gift Photo" />
   \`\`\`

This method is simple but doesn't provide optimization benefits.

## 2. Using Next.js Image Component (Recommended)

For better performance, use the Next.js `Image` component:

1. First, import the Image component:
   \`\`\`jsx
   import Image from 'next/image'
   \`\`\`

2. For images in the public directory:
   \`\`\`jsx
   <Image 
     src="/images/gift-photo.jpg"
     alt="Gift Photo"
     width={500}
     height={300}
     priority
   />
   \`\`\`

3. For external images, make sure the domain is configured in `next.config.mjs`:
   \`\`\`jsx
   <Image 
     src="https://example.com/image.jpg"
     alt="External Image"
     width={500}
     height={300}
   />
   \`\`\`

## 3. Replacing Placeholder Images

To replace the placeholder images in the gift recommendations:

1. Update the `image` field in the `gift-recommendations.ts` file:
   \`\`\`typescript
   {
     id: "photography-cousin",
     // other fields...
     image: "/images/photo-album.jpg", // Update this path
     // remaining fields...
   }
   \`\`\`

2. Make sure to add the actual image file to the corresponding path in the public directory.

## 4. Adding Images to Product Cards

To update the product card images:

1. Place your product images in `public/images/products/`

2. Update the image paths in your components:
   \`\`\`jsx
   <img
     src={`/images/products/${productId}.jpg`}
     alt={product.title}
     className="max-h-full max-w-full object-contain p-4"
   />
   \`\`\`

## 5. Using External Image URLs

If you're using external image URLs (like from a CDN or e-commerce site):

1. Make sure the domain is allowed in your `next.config.mjs` file:
   \`\`\`javascript
   images: {
     domains: ['example.com', 'cdn.example.com'],
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',
       },
     ],
   }
   \`\`\`

2. Then use the Image component with the external URL:
   \`\`\`jsx
   <Image
     src="https://example.com/product-image.jpg"
     alt="Product"
     width={400}
     height={400}
   />
   \`\`\`

## 6. Optimizing Images

For better performance:

1. Use appropriate image formats (WebP or AVIF when possible)
2. Specify correct dimensions to avoid layout shifts
3. Use the `priority` attribute for above-the-fold images
4. Consider using `placeholder="blur"` for a better loading experience

## Example: Updating a Gift Card with an Image

\`\`\`jsx
import Image from 'next/image'

// In your component
<Card>
  <CardContent>
    <div className="h-48 bg-white rounded-md mb-4 flex items-center justify-center">
      <Image
        src="/images/products/tech-watch.jpg"
        alt="Smart Watch"
        width={200}
        height={200}
        className="object-contain"
      />
    </div>
    {/* Rest of card content */}
  </CardContent>
</Card>
\`\`\`

Remember to optimize your images before adding them to your project to ensure fast loading times!
