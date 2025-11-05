import type { NextConfig } from 'next';

const hostnames = [
  'res.cloudinary.com',
  'lh3.googleusercontent.com',
  'avatars.githubusercontent.com',
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
