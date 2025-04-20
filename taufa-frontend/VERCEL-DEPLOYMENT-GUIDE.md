# Vercel Deployment Guide for Taufa Gift Recommender

This guide will help you successfully deploy your Taufa Gift Recommender application to Vercel.

## Deployment Options

### Option 1: Deploy from Git Repository (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" > "Project"
4. Import your Git repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: Leave as is (if your project is in the root)
   - Build Command: `npm run build`
   - Output Directory: `.next` (for Next.js) or `dist` (for Vite)
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Login to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Navigate to your project directory and run:
   \`\`\`bash
   vercel
   \`\`\`

4. Follow the prompts to configure your deployment

## Troubleshooting 404 Errors

If you're getting 404 errors after deployment, here are some common solutions:

### 1. Check your build output

Make sure your application is building correctly:

\`\`\`bash
npm run build
\`\`\`

### 2. Verify your framework settings

For Next.js projects:
- Ensure you're using the App Router correctly
- Check that your page files are in the correct locations

### 3. Add a `vercel.json` configuration file

Create a `vercel.json` file in the root of your project:

\`\`\`json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
\`\`\`

This will redirect all requests to your index page, which is useful for single-page applications.

### 4. Check environment variables

If your app depends on environment variables:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Environment Variables"
3. Add all required variables

### 5. Inspect build logs

1. Go to your Vercel dashboard
2. Select your project
3. Click on the latest deployment
4. Check the "Build Logs" for any errors

### 6. Force a clean rebuild

Sometimes clearing the cache helps:

\`\`\`bash
vercel --force
\`\`\`

## Next.js vs Vite Configuration

### For Next.js Projects (Current Setup)

Your current project is using Next.js, which is well-supported by Vercel (they created it). The default configuration should work without issues.

### For Vite Projects

If you want to convert to Vite:

1. Install Vite and React plugin:
   \`\`\`bash
   npm install vite @vitejs/plugin-react --save-dev
   \`\`\`

2. Create a `vite.config.js` file:
   \`\`\`javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist',
     },
   });
   \`\`\`

3. Update your `package.json` scripts:
   \`\`\`json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   \`\`\`

4. Create a `vercel.json` file:
   \`\`\`json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/"
       }
     ]
   }
   \`\`\`

5. Move your `index.html` to the root directory if using Vite

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)

If you continue to have issues, you can contact Vercel support or check their status page at [status.vercel.com](https://status.vercel.com).
