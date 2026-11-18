/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['msedge-tts', 'ws', 'bufferutil', 'utf-8-validate'],
  },
};

export default nextConfig;
