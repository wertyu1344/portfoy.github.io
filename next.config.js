/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // GitHub Pages için temel yolu ayarlayın
  basePath: '/portfoy.github.io',
  assetPrefix: '/portfoy.github.io/',
  webpack(config) {
    // SVG dosyalarını işlemek için yapılandırma
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
}

module.exports = nextConfig
