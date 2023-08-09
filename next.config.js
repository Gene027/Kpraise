/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API: process.env.NEXT_PUBLIC_API,
    FIREBASE_API: process.env.NEXT_PUBLIC_FIREBASE_API,
  }
}

module.exports = nextConfig
