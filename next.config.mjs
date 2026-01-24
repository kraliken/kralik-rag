/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  experimental: {
    // Ez oldja meg a MongoDB SyntaxError-t az Azure-ön
    serverComponentsExternalPackages: ['mongodb'],
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
};

export default nextConfig;