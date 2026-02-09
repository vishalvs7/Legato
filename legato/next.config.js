/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  },
  // Disable Turbopack for stability
  experimental: {
    turbo: undefined,
  },
}
module.exports = nextConfig
