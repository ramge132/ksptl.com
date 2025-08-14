/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@radix-ui/react-dialog', '@sparticuz/chromium', 'puppeteer-core', 'pdfkit'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });
    return config;
  },
}

export default nextConfig
