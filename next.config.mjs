/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Disable caching untuk development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  // Ensure consistent builds
  productionBrowserSourceMaps: false,
  compress: true,
  swcMinify: true,
  // Disable static optimization yang mungkin menyebabkan cache
  staticPageGenerationTimeout: 60,
};

export default nextConfig;