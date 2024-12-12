# Melting Pot Plus

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/meltingpotplus/deploys)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A multilingual e-commerce and cultural exchange platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌍 Multilingual support (English, Spanish, French, Arabic, Amharic)
- 🛍️ E-commerce functionality with shopping cart
- 📱 Responsive design with modern UI/UX
- 🔒 Authentication system
- 📝 Blog system with multilingual content
- 🏪 Vendor marketplace
- 🌓 Dark mode support
- ⚡ Server-side rendering and static generation
- 🎨 Tailwind CSS for styling
- 🔄 Smooth page transitions

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/melting-pot-plus.git
cd melting-pot-plus
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Netlify

### Method 1: Deploy with Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize Netlify:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

### Method 2: Deploy via Netlify UI

1. Push your code to GitHub
2. Log in to Netlify
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Configure environment variables in Netlify UI
7. Deploy!

### Environment Variables

Make sure to set the following environment variables in Netlify:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- (Add other variables from .env.example)

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
├── components/         # Reusable components
├── config/            # Configuration files
├── contexts/          # React contexts
├── data/             # Sample data and constants
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Performance Optimization

- Images are optimized using Next.js Image component
- Fonts are optimized using next/font
- Code splitting and lazy loading implemented
- Static page generation where possible
- API routes are edge-optimized

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Netlify for hosting and deployment
- All contributors and users of the platform