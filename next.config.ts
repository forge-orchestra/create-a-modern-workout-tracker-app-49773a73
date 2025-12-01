import { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withPlugins(
  [
    withTM(['lucide-react']),
  ],
  nextConfig
);