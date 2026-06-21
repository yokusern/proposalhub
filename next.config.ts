import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin', 'stripe', '@google/generative-ai'],
}

export default nextConfig
