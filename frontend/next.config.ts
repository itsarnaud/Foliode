import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'www.localhost' }],
        destination: '/',
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'app.localhost' }],
        destination: '/app/dashboard',
      },
      {
        source: '/login',
        has: [{ type: 'host', value: 'app.localhost' }],
        destination: '/app/login',
      },
      {
        source: '/signup',
        has: [{ type: 'host', value: 'app.localhost' }],
        destination: '/app/signup',
      },
      {
        source: '/_next/static/:path*',
        has: [{ type: 'host', value: 'app.localhost' }],
        destination: '/_next/static/:path*',
      },
      {
        source: '/foliode-icon.svg',
        has: [{ type: 'host', value: 'app.localhost' }],
        destination: '/foliode-icon.svg',
      },
    ]
  }
};

export default nextConfig;