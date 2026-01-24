/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  experimental: {
    // A mongoose-t is add hozzá, mert a mongodb-re épül és zavart okozhat!
    serverComponentsExternalPackages: ['mongodb', 'mongoose', '@auth/mongodb-adapter'],
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
};

export default nextConfig;