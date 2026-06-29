/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable default image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
