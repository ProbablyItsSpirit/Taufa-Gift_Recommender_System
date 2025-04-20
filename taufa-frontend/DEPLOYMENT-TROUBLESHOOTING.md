# Deployment Troubleshooting Guide

## Common Deployment Errors

### Error: No Output Directory found after Build

If you encounter this error:
\`\`\`
Error: No Output Directory named "dist" found after the Build completed. You can configure the Output Directory in your Project Settings.
\`\`\`

This means Vercel couldn't find the expected output directory after your build process completed. Here's how to fix it:

## Solution 1: Update Vercel Project Settings

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Build & Development Settings"
5. Under "Output Directory", make sure it matches your framework's output:
   - For Next.js: `.next`
   - For Vite: `dist`
   - For Create React App: `build`

## Solution 2: Simplify Your Configuration

1. Remove any custom `outputDirectory` from your `vercel.json` file
2. Let Vercel auto-detect your framework and use the default settings
3. Your `vercel.json` should be minimal:
   \`\`\`json
   {
     "framework": "nextjs"
   }
   \`\`\`

## Solution 3: Check Your Build Command

Ensure your `package.json` has the correct build command:

\`\`\`json
"scripts": {
  "build": "next build"
}
\`\`\`

## Solution 4: Verify Framework Detection

Make sure Vercel is correctly detecting your framework:

1. In your Vercel project settings, check "Framework Preset"
2. It should be set to "Next.js" for a Next.js project
3. If it's not detecting correctly, set it manually

## Solution 5: Check for Custom Output Directory

If you've customized your output directory in `next.config.js` or `next.config.mjs`:

1. Remove any `distDir` setting from your Next.js config
2. Or make sure your Vercel output directory setting matches your custom `distDir`

## Additional Troubleshooting

If you're still having issues:

1. Check your build logs for any errors
2. Ensure all dependencies are correctly installed
3. Try a clean install with `npm ci` before building
4. Consider using the Vercel CLI to deploy locally first:
   \`\`\`
   npm i -g vercel
   vercel
   \`\`\`

Remember that Vercel has different default output directories depending on the framework:
- Next.js: `.next`
- Create React App: `build`
- Vite: `dist`
- Gatsby: `public`

Make sure your configuration aligns with these expectations or is explicitly overridden in your Vercel project settings.
