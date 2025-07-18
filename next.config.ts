import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ⬅️ INI yang penting
  },
  eslint: {
    ignoreDuringBuilds: true, // Ini mematikan error eslint saat build
  },
}

export default nextConfig
