/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API: process.env.API,
    FIREBASE_API: process.env.FIREBASE_API,
  }
}

module.exports = nextConfig
