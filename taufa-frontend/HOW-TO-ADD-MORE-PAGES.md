# How to Add More Gift Recommendation Pages

This guide explains how to add more gift recommendation pages to the Taufa application.

## Adding a New Gift Recommendation

1. Open the file `lib/gift-recommendations.ts`

2. Add a new entry to the `giftRecommendations` array following this template:

\`\`\`typescript
{
  id: "unique-id-for-the-gift", // Use kebab-case for the ID
  query: "The exact query text that will trigger this recommendation",
  title: "Gift Product Title",
  price: "₹1,450",
  originalPrice: "₹1,800", // Optional
  discount: "19%", // Optional
  image: "/placeholder.svg?height=400&width=400", // Replace with actual image path
  description: "Detailed description of the gift",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4"
  ],
  details: {
    "Detail Label 1": "Detail Value 1",
    "Detail Label 2": "Detail Value 2",
    "Detail Label 3": "Detail Value 3",
    "Detail Label 4": "Detail Value 4"
  }
}
\`\`\`

3. Make sure the `query` field exactly matches the text that will be entered or selected in the personalization page.

4. The `id` field will be used in the URL for the recommendation page (e.g., `/recommended/unique-id-for-the-gift`).

## Adding the Query to the Example Suggestions

To make your new gift recommendation appear in the example suggestions:

1. Open the file `app/personalisation/page.tsx`

2. Find the `EXAMPLE_QUERIES` array at the top of the file

3. Add your new query text to the array:

\`\`\`typescript
const EXAMPLE_QUERIES = [
  // Existing queries...
  "Your new query text here",
];
\`\`\`

## Testing Your New Recommendation

1. Start the development server with `npm run dev`

2. Go to the Personalization page

3. Select or type your new query text

4. Click "Recommend Now"

5. You should be redirected to your new gift recommendation page

## Creating Custom Pages for Special Recommendations

If you need a completely custom page for a specific recommendation:

1. Create a new file at `app/recommended/[custom-path]/page.tsx`

2. Implement your custom page component

3. Update the `handleSubmit` function in `app/personalisation/page.tsx` to redirect to your custom page when needed:

\`\`\`typescript
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

  // Check for special cases
  if (description === "Your special query text") {
    setTimeout(() => {
      router.push("/recommended/custom-path");
    }, 2000);
    return;
  }

  // Find the matching gift recommendation
  const matchingGift = giftRecommendations.find(gift => gift.query === description);
  
  // Simulate loading and then redirect
  setTimeout(() => {
    if (matchingGift) {
      // Redirect to the specific recommendation page
      router.push(`/recommended/${matchingGift.id}`);
    } else {
      // If no exact match, redirect to the default recommendation page
      router.push("/recommended");
    }
  }, 2000)
}
\`\`\`

This flexible approach allows you to add as many gift recommendations as needed while maintaining a consistent user experience.
