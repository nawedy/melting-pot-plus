/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['meltingpotplus.netlify.app'], // Add your image domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.netlify.app',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Ensure static export works with i18n
  trailingSlash: true,
}

// Analyze build if ANALYZE is set
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
} 