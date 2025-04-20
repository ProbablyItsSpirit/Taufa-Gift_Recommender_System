# Image Replacement Guide for Taufa Gift Recommender

This guide explains how to replace the placeholder text files with your actual product images.

## Directory Structure

All product images should be placed in the following directory structure:
\`\`\`
public/
  images/
    gifts/       # Main product images
    toy-car/     # Additional images for the toy car product
    [product-id]/ # Additional images for other products (as needed)
\`\`\`

## Steps to Replace Images

1. **Prepare your images**:
   - Optimize all images for web (compress them using tools like TinyPNG, ImageOptim, etc.)
   - Resize images to appropriate dimensions (recommended: 800x800px for product images)
   - Use appropriate formats (JPG for photos, PNG for images with transparency)

2. **Replace the placeholder files**:
   - For each product, find the corresponding `.txt` file in `public/images/gifts/`
   - Replace it with your actual image file using the same name but with the correct extension
   - Example: Replace `toy-car.txt` with `toy-car.jpg` or `toy-car.png`

3. **Update image references in code**:
   - Open `lib/gift-recommendations.ts`
   - Update the `image` property for each product to point to your new image
   - Example:
     \`\`\`typescript
     {
       id: "toy-car",
       // other properties...
       image: "/images/gifts/toy-car.png", // Update the extension to match your file
       // other properties...
     }
     \`\`\`

4. **For additional product images**:
   - Replace the angle files in the product-specific folders
   - Example: Replace `public/images/toy-car/angle-1.txt` with `public/images/toy-car/angle-1.jpg`
   - Update any references to these images in your code

## Using the ImageDisplay Component

We've created a reusable `ImageDisplay` component that handles both placeholder images and real images:

\`\`\`jsx
import { ImageDisplay } from "@/components/image-display";

// In your component
<ImageDisplay 
  src="/images/gifts/toy-car.png" 
  alt="Remote Control Racing Car" 
  width={400} 
  height={400} 
  className="max-w-full object-contain"
/>
\`\`\`

## Testing Your Images

After replacing the images:

1. Run the development server: `npm run dev`
2. Navigate to the product pages to ensure images are displaying correctly
3. Check that the images are responsive and load properly on different devices

## Image Best Practices

- Keep image file sizes under 200KB when possible
- Use descriptive alt text for accessibility
- Consider adding WebP versions of your images for better performance
- Maintain consistent aspect ratios across product images

If you have any questions or issues with image replacement, refer to the Next.js documentation on images or contact the development team.
\`\`\`

```typescriptreact file="lib/gift-recommendations.ts"
[v0-no-op-code-block-prefix]// This file contains the mapping between queries and gift recommendations

export interface GiftRecommendation {
  id: string
  query: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
  image: string
  description: string
  features: string[]
  details: Record<string, string>
  productUrl: string // Add this new field
}

export const giftRecommendations: GiftRecommendation[] = [
  {
    id: "toy-car",
    query: "Recommend me a Toy Car",
    title: "Remote Control Racing Car with Drift Function",
    price: "₹1,299",
    originalPrice: "₹1,999",
    discount: "35%",
    image: "/images/gifts/toy-car.png",
    description:
      "High-speed remote control racing car with drift function, perfect for both indoor and outdoor play. Features realistic design, LED lights, and responsive controls for an exciting racing experience.",
    features: [
      "2.4GHz remote control with 50m range",
      "Rechargeable battery with 30 minutes playtime",
      "Drift function for exciting stunts",
      "LED headlights and taillights",
      "Shock-resistant design for durability",
    ],
    details: {
      "Age recommendation": "6+ years",
      Battery: "Rechargeable 3.7V 500mAh Li-ion",
      "Charging time": "60-90 minutes",
      "Remote control": "2.4GHz with 50m range",
      Speed: "Up to 15 km/h",
      Material: "High-quality ABS plastic",
      Dimensions: "25 × 12 × 8 cm",
    },
    productUrl: "https://www.amazon.in/remote-control-car/dp/B09ABCDEFG",
  },
  {
    id: "photography-cousin",
    query: "Recommend a thoughtful gift for my 22-year-old cousin who loves photography under ₹2000",
    title: "Instax Mini Photo Album with Personalized Cover",
    price: "₹1,899",
    originalPrice: "₹2,499",
    discount: "24%",
    image: "/images/gifts/photography-cousin.png",
    description:
      "A beautiful photo album designed specifically for Instax Mini prints with a personalized cover. Perfect for photography enthusiasts to display their favorite shots.",
    features: [
      "Holds 120 Instax Mini photos",
      "Personalized cover with name or message",
      "Premium leather-like material",
      "Acid-free pages to preserve photos",
    ],
    details: {
      Material: "Faux leather, acid-free paper",
      Dimensions: "15 x 12 x 3 cm",
      "Color options": "Black, Brown, Navy Blue",
      Customization: "Name or short message",
    },
    productUrl: "https://www.amazon.in/instax-mini-photo-album/dp/B07XYZABC",
  },
  {
    id: "skincare-sister",
    query: "I want to buy a skincare gift set for my 30-year-old sister-in-law, within ₹1500",
    title: "Forest Essentials Mini Facial Care Set",
    price: "₹1,450",
    originalPrice: "₹1,800",
    discount: "19%",
    image: "/images/gifts/skincare-sister.png",
    description: "A luxurious Ayurvedic skincare set with natural ingredients perfect for daily facial care routine.",
    features: [
      "100% natural ingredients",
      "Paraben and sulfate-free",
      "Suitable for all skin types",
      "Travel-friendly sizes",
    ],
    details: {
      Contents: "Facial cleanser, toner, moisturizer, face mask",
      "Skin type": "All skin types",
      Ingredients: "Natural botanical extracts, essential oils",
      "Made in": "India",
    },
    productUrl: "https://www.forestessentials.com/facial-care-set",
  },
  {
    id: "gardening-dad",
    query: "Suggest a fun gift for my dad who loves gardening, budget ₹1200",
    title: "Indoor Herb Garden Starter Kit",
    price: "₹1,150",
    originalPrice: "₹1,400",
    discount: "18%",
    image: "/images/gifts/gardening-dad.png",
    description: "Everything needed to grow fresh herbs at home with minimal effort. Perfect for garden enthusiasts.",
    features: [
      "5 types of herb seeds included",
      "Self-watering planter system",
      "Expandable design",
      "Includes plant nutrients",
    ],
    details: {
      Contents: "5 seed packets, 5 soil discs, 5 plant markers, planter",
      "Herbs included": "Basil, Parsley, Cilantro, Mint, Chives",
      Material: "Recycled plastic",
      Dimensions: "30 x 12 x 10 cm",
    },
    productUrl: "https://www.myntra.com/herb-garden-kit",
  },
  {
    id: "anime-girl",
    query: "I need a gift for a 19-year-old girl who's into anime, under ₹1000",
    title: "Anime Character Figurine Collection",
    price: "₹950",
    originalPrice: "₹1,200",
    discount: "21%",
    image: "/images/gifts/anime-girl.png",
    description: "High-quality collectible figurines of popular anime characters. Perfect for anime enthusiasts.",
    features: [
      "Set of 3 mini figurines",
      "Highly detailed design",
      "Limited edition collection",
      "Display stand included",
    ],
    details: {
      Material: "PVC",
      Height: "10-12 cm each",
      Characters: "From popular anime series",
      Packaging: "Gift box included",
    },
    productUrl: "https://www.amazon.in/anime-figurine-collection",
  },
  {
    id: "travel-friend",
    query: "Looking for a present for my 25-year-old friend who travels a lot, under ₹1800",
    title: "Compact Travel Organizer Backpack",
    price: "₹1,750",
    originalPrice: "₹2,200",
    discount: "20%",
    image: "/images/gifts/travel-friend.png",
    description:
      "A versatile, water-resistant backpack with multiple compartments designed specifically for travelers.",
    features: ["Anti-theft design", "USB charging port", "Water-resistant material", "Multiple hidden compartments"],
    details: {
      Material: "Water-resistant polyester",
      Capacity: "25L",
      Dimensions: "45 x 30 x 15 cm",
      Weight: "0.8 kg",
    },
    productUrl: "https://www.amazon.in/travel-organizer-backpack",
  },
  {
    id: "tech-man",
    query: "Suggest something classy for a 28-year-old man who likes tech gadgets, under ₹2500",
    title: "GIVA 925 Silver Turquoise Blue Tear Drop Earrings",
    price: "₹2,450",
    originalPrice: "₹3,000",
    discount: "18%",
    image: "/images/gifts/tech-man.png",
    description:
      "A sleek, modern smartwatch with multiple features and a classic design that works for both casual and formal settings.",
    features: ["Heart rate monitoring", "Sleep tracking", "Notification alerts", "Water-resistant design"],
    details: {
      Material: "Stainless steel, tempered glass",
      "Battery life": "Up to 7 days",
      Compatibility: "iOS and Android",
      "Water resistance": "IP68 rated",
    },
    productUrl: "https://www.amazon.in/smartwatch-men",
  },
  {
    id: "cooking-aunt",
    query: "Recommend a birthday gift for my aunt who enjoys cooking, under ₹1500",
    title: "Premium Spice Box Gift Set",
    price: "₹1,450",
    originalPrice: "₹1,800",
    discount: "19%",
    image: "/images/gifts/cooking-aunt.png",
    description: "A beautifully crafted wooden spice box with 12 essential Indian spices in airtight containers.",
    features: [
      "Handcrafted wooden box",
      "12 premium spices included",
      "Airtight containers",
      "Rotating design for easy access",
    ],
    details: {
      Material: "Sheesham wood, stainless steel",
      Dimensions: "25 x 25 x 8 cm",
      "Spices included": "12 essential Indian spices",
      Storage: "Airtight containers with labels",
    },
    productUrl: "https://www.amazon.in/spice-box-gift-set",
  },
  {
    id: "crochet-mom",
    query: "I want a unique gift for my mom who does crochet, under ₹1000",
    title: "Luxury Crochet Hook Set with Case",
    price: "₹950",
    originalPrice: "₹1,200",
    discount: "21%",
    image: "/images/gifts/crochet-mom.png",
    description:
      "A complete set of ergonomic crochet hooks with a beautiful carrying case, perfect for crochet enthusiasts.",
    features: [
      "Ergonomic design for comfort",
      "9 different sizes included",
      "Soft grip handles",
      "Elegant carrying case",
    ],
    details: {
      Material: "Aluminum hooks with rubber grips",
      "Sizes included": "2.5mm to 6.0mm",
      "Case material": "Canvas with leather trim",
      Accessories: "Includes stitch markers and measuring tape",
    },
    productUrl: "https://www.amazon.in/crochet-hook-set",
  },
  {
    id: "guitar-guy",
    query: "Gift ideas for a 20-year-old guy who plays guitar, budget ₹1700",
    title: "Guitar Accessory Premium Kit",
    price: "₹1,650",
    originalPrice: "₹2,000",
    discount: "17%",
    image: "/images/gifts/guitar-guy.png",
    description: "A comprehensive kit with everything a guitarist needs, from tuners to picks to maintenance tools.",
    features: ["Digital chromatic tuner", "Premium guitar strap", "Variety of picks", "Guitar maintenance tools"],
    details: {
      Contents: "Tuner, capo, strap, picks, string winder, cleaning kit",
      Case: "Durable carrying case included",
      "Pick variety": "Different thicknesses for various styles",
      Compatibility: "Works with acoustic and electric guitars",
    },
    productUrl: "https://www.amazon.in/guitar-accessory-kit",
  },
  {
    id: "cozy-girlfriend",
    query: "I need something cozy and cute for my 23-year-old girlfriend, under ₹2000",
    title: "Personalized Cozy Gift Hamper",
    price: "₹1,950",
    originalPrice: "₹2,400",
    discount: "19%",
    image: "/images/gifts/cozy-girlfriend.png",
    description: "A thoughtfully curated gift hamper with cozy items perfect for relaxation and self-care.",
    features: ["Soft throw blanket", "Scented candle", "Personalized mug", "Gourmet hot chocolate"],
    details: {
      "Blanket material": "Ultra-soft microfiber",
      Candle: "Soy wax with essential oils",
      Mug: "Ceramic with custom name",
      Packaging: "Premium gift box with ribbon",
    },
    productUrl: "https://www.amazon.in/cozy-gift-hamper",
  },
  {
    id: "skincare-wellness-aunt",
    query: "Suggest a gift for a 40-year-old aunt who's into skincare and wellness",
    title: "Luxury Aromatherapy Diffuser Set",
    price: "₹2,250",
    originalPrice: "₹2,800",
    discount: "20%",
    image: "/images/gifts/skincare-wellness-aunt.png",
    description: "An elegant essential oil diffuser with a set of premium essential oils for relaxation and wellness.",
    features: [
      "Ceramic diffuser with LED lights",
      "Set of 5 essential oils",
      "Multiple mist settings",
      "Auto shut-off feature",
    ],
    details: {
      Material: "Ceramic, wood accent",
      "Oils included": "Lavender, Eucalyptus, Lemon, Peppermint, Tea Tree",
      "Coverage area": "Up to 300 sq ft",
      "Timer settings": "1h, 3h, 6h, continuous",
    },
    productUrl: "https://www.amazon.in/aromatherapy-diffuser-set",
  },
  {
    id: "memes-quirky",
    query: "Looking for something quirky for a 21-year-old who loves memes, under ₹800",
    title: "Meme-Inspired Desk Accessories Set",
    price: "₹750",
    originalPrice: "₹950",
    discount: "21%",
    image: "/images/gifts/memes-quirky.png",
    description: "A fun collection of desk accessories featuring popular meme references and quirky designs.",
    features: ["Meme-themed sticky notes", "Funny desk calendar", "Quirky pen holder", "Humorous coasters"],
    details: {
      Contents: "Sticky notes, desk calendar, pen holder, 4 coasters",
      Material: "Recycled paper, ceramic",
      Theme: "Internet meme culture",
      Packaging: "Gift box included",
    },
    productUrl: "https://www.amazon.in/meme-desk-accessories",
  },
  {
    id: "spiritual-grandmother",
    query: "Need a spiritual gift for my grandmother under ₹1200",
    title: "Meditation and Prayer Gift Set",
    price: "₹1,150",
    originalPrice: "₹1,400",
    discount: "18%",
    image: "/images/gifts/spiritual-grandmother.png",
    description: "A thoughtful spiritual gift set with items for meditation, prayer, and peaceful reflection.",
    features: ["Handcrafted prayer beads", "Brass singing bowl", "Scented meditation candles", "Inspirational book"],
    details: {
      Materials: "Wood, brass, soy wax",
      "Prayer beads": "108 beads with tassel",
      "Singing bowl": "4-inch diameter brass bowl with striker",
      Book: "Daily reflections and prayers",
    },
    productUrl: "https://www.amazon.in/meditation-prayer-gift-set",
  },
  {
    id: "self-care-working-woman",
    query: "Recommend a self-care gift box for a 27-year-old working woman, within ₹1800",
    title: "Luxury Self-Care Pamper Box",
    price: "₹1,750",
    originalPrice: "₹2,200",
    discount: "20%",
    image: "/images/gifts/self-care-working-woman.png",
    description: "A premium self-care gift box designed to help busy working women relax and rejuvenate.",
    features: ["Bath bombs and salts", "Face mask set", "Scented candle", "Relaxation tea blend"],
    details: {
      Contents: "2 bath bombs, bath salts, 3 sheet masks, candle, tea",
      Ingredients: "Natural, cruelty-free",
      Candle: "Soy wax with cotton wick",
      Packaging: "Eco-friendly gift box",
    },
    productUrl: "https://www.amazon.in/self-care-pamper-box",
  },
  {
    id: "history-uncle",
    query: "I want to buy something meaningful for my 60-year-old uncle who loves history",
    title: "Vintage World Map with Personalized Plaque",
    price: "₹2,450",
    originalPrice: "₹3,000",
    discount: "18%",
    image: "/images/gifts/history-uncle.png",
    description:
      "A beautifully detailed vintage-style world map with a personalized brass plaque, perfect for history enthusiasts.",
    features: ["High-quality canvas print", "Antique-style design", "Personalized brass plaque", "Ready to hang"],
    details: {
      Material: "Canvas, wooden frame, brass plaque",
      Dimensions: "60 x 40 cm",
      Personalization: "Custom message on brass plaque",
      Style: "Vintage explorer map with antiqued finish",
    },
    productUrl: "https://www.amazon.in/vintage-world-map",
  },
  {
    id: "home-decor-bhabhi",
    query: "Suggest something home-decor related for my bhabhi under ₹1500",
    title: "Handcrafted Ceramic Vase Set",
    price: "₹1,450",
    originalPrice: "₹1,800",
    discount: "19%",
    image: "/images/gifts/home-decor-bhabhi.png",
    description: "A set of three beautifully handcrafted ceramic vases in complementary colors and designs.",
    features: [
      "Set of 3 different sized vases",
      "Hand-painted designs",
      "Unique glazed finish",
      "Versatile for different spaces",
    ],
    details: {
      Material: "Handcrafted ceramic",
      Sizes: "Small, medium, and large",
      Colors: "Complementary pastel shades",
      Origin: "Artisan-made in Jaipur",
    },
    productUrl: "https://www.amazon.in/ceramic-vase-set",
  },
  {
    id: "gym-fitness",
    query: "Recommend a gym accessory gift for a 24-year-old fitness enthusiast",
    title: "Smart Fitness Tracker Bundle",
    price: "₹2,450",
    originalPrice: "₹3,000",
    discount: "18%",
    image: "/images/gifts/gym-fitness.png",
    description: "A comprehensive fitness tracking bundle with smart features to monitor workouts and health metrics.",
    features: ["Smart fitness band", "Bluetooth earbuds", "Microfiber towel", "Stainless steel water bottle"],
    details: {
      "Fitness band": "Heart rate, step counter, sleep tracking",
      Earbuds: "Sweat-resistant, 6-hour battery life",
      "Water bottle": "500ml, vacuum insulated",
      Compatibility: "iOS and Android",
    },
    productUrl: "https://www.amazon.in/smart-fitness-tracker",
  },
  {
    id: "book-lover-aunt",
    query: "Find me a gift for a book-lover aunt aged around 35, budget ₹900",
    title: "Luxury Bookworm Gift Set",
    price: "₹850",
    originalPrice: "₹1,100",
    discount: "23%",
    image: "/images/gifts/book-lover-aunt.png",
    description: "A thoughtfully curated gift set for book lovers with everything needed for cozy reading sessions.",
    features: ["Handcrafted bookmark set", "Book-scented candle", "Reading light", "Literary-themed mug"],
    details: {
      Bookmarks: "Set of 5 handcrafted designs",
      Candle: "Book-scented soy wax (old books aroma)",
      "Reading light": "Clip-on, adjustable brightness",
      Mug: "Literary quotes design, 350ml",
    },
    productUrl: "https://www.amazon.in/bookworm-gift-set",
  },
  {
    id: "fragrance-wife",
    query: "I want a gift set for my wife's birthday, she's 29 and loves fragrances",
    title: "Luxury Perfume Gift Collection",
    price: "₹2,450",
    originalPrice: "₹3,000",
    discount: "18%",
    image: "/images/gifts/fragrance-wife.png",
    description:
      "A luxurious collection of premium fragrances in an elegant gift box, perfect for fragrance enthusiasts.",
    features: [
      "Set of 5 premium perfume miniatures",
      "Scented body lotion",
      "Perfumed bath bombs",
      "Elegant gift packaging",
    ],
    details: {
      Perfumes: "5 designer fragrance miniatures",
      "Body lotion": "200ml matching scent",
      "Bath bombs": "Set of 3 coordinating scents",
      Packaging: "Luxury gift box with satin lining",
    },
    productUrl: "https://www.amazon.in/perfume-gift-collection",
  },
  {
    id: "college-student",
    query: "Need a cool yet affordable gift for a college student under ₹1000",
    title: "Multi-functional Desk Organizer with Wireless Charger",
    price: "₹950",
    originalPrice: "₹1,200",
    discount: "21%",
    image: "/images/gifts/college-student.png",
    description: "A space-saving desk organizer with built-in wireless charging pad, perfect for college students.",
    features: ["Wireless charging pad", "Multiple compartments", "Phone/tablet stand", "USB port"],
    details: {
      Material: "Eco-friendly bamboo",
      Charging: "10W wireless charging",
      Compatibility: "All Qi-enabled devices",
      Dimensions: "25 x 15 x 12 cm",
    },
    productUrl: "https://www.amazon.in/desk-organizer-wireless-charger",
  },
  {
    id: "journaling-stationery",
    query: "Gift for a 26-year-old woman who loves journaling and stationery, budget ₹700",
    title: "Premium Journaling Kit",
    price: "₹650",
    originalPrice: "₹850",
    discount: "24%",
    image: "/images/gifts/journaling-stationery.png",
    description: "A beautiful journaling kit with premium stationery items for creative expression.",
    features: ["Hardcover dotted journal", "Set of fine-tip pens", "Decorative washi tapes", "Sticker collection"],
    details: {
      Journal: "A5 size, 160 pages, 120gsm paper",
      Pens: "Set of 8 colors, 0.38mm fine tip",
      "Washi tapes": "5 decorative designs",
      Stickers: "200+ decorative stickers",
    },
    productUrl: "https://www.amazon.in/premium-journaling-kit",
  },
  {
    id: "classy-cousin",
    query: "Suggest a classy gift for my cousin brother who just got a job, under ₹2000",
    title: "Executive Desk Set with Personalized Pen",
    price: "₹1,950",
    originalPrice: "₹2,400",
    discount: "19%",
    image: "/images/gifts/classy-cousin.png",
    description: "A sophisticated desk set with personalized pen, perfect for a new professional.",
    features: ["Personalized metal pen", "Business card holder", "Desk organizer", "Leather-bound notebook"],
    details: {
      Material: "Genuine leather, stainless steel",
      Personalization: "Engraved name on pen",
      Notebook: "A5 size, lined pages",
      Packaging: "Gift box included",
    },
    productUrl: "https://www.amazon.in/executive-desk-set",
  },
  {
    id: "practical-mom",
    query: "Find a practical gift for a 38-year-old mom of two, within ₹1300",
    title: "Multi-functional Kitchen Gadget Set",
    price: "₹1,250",
    originalPrice: "₹1,600",
    discount: "22%",
    image: "/images/gifts/practical-mom.png",
    description: "A set of time-saving kitchen gadgets designed to make cooking easier for busy parents.",
    features: [
      "3-in-1 avocado tool",
      "Herb scissors with cleaning comb",
      "Adjustable measuring spoons",
      "Silicone food savers",
    ],
    details: {
      Material: "Food-grade stainless steel, silicone",
      "Dishwasher safe": "Yes",
      "Food savers": "Set of 6 different sizes",
      Packaging: "Gift box with usage guide",
    },
    productUrl: "https://www.amazon.in/kitchen-gadget-set",
  },
  {
    id: "relaxing-maasi",
    query: "I want something sweet and relaxing for my maasi, under ₹1500",
    title: "Relaxation Tea and Treats Hamper",
    price: "₹1,450",
    originalPrice: "₹1,800",
    discount: "19%",
    image: "/images/gifts/relaxing-maasi.png",
    description: "A thoughtful hamper with relaxing teas and sweet treats for peaceful moments.",
    features: [
      "Assorted herbal tea collection",
      "Honey dipper with premium honey",
      "Handmade cookies",
      "Ceramic tea mug",
    ],
    details: {
      Teas: "10 varieties of calming herbal teas",
      Honey: "250g organic wild flower honey",
      Cookies: "Assorted handmade shortbread cookies",
      Mug: "Handcrafted ceramic, 300ml",
    },
    productUrl: "https://www.amazon.in/relaxation-tea-hamper",
  },
  {
    id: "fashionista-accessory",
    query: "Recommend a stylish accessory for a 30-year-old fashionista under ₹1000",
    title: "GIVA 925 Silver Turquoise Blue Tear Drop Earrings",
    price: "₹950",
    originalPrice: "₹1,200",
    discount: "21%",
    image: "/images/gifts/fashionista-accessory.png",
    description:
      "Elegant tear drop earrings made with 925 silver and turquoise blue stones, perfect for fashion enthusiasts.",
    features: ["925 Sterling Silver", "Turquoise blue gemstones", "Rhodium plated for durability", "Hypoallergenic"],
    details: {
      Material: "Silver, Turquoise, Zircon",
      "Metal type": "Sterling Silver",
      "Gem type": "Zircon",
      "Country of Origin": "India",
    },
    productUrl: "https://www.amazon.in/silver-turquoise-earrings",
  },
]

// Function to find a gift recommendation by query
export function findGiftByQuery(query: string): GiftRecommendation | undefined {
  return giftRecommendations.find((gift) => gift.query === query)
}

// Function to find a gift recommendation by ID
export function findGiftById(id: string): GiftRecommendation | undefined {
  return giftRecommendations.find((gift) => gift.id === id)
}

// Function to get all gift recommendations
export function getAllGiftRecommendations(): GiftRecommendation[] {
  return giftRecommendations
}
