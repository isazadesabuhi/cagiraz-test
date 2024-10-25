const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["az", "en", "ru"],
    defaultLocale: "az",
    localeDetection: false,
  },
  swcMinify: true,
  images: {
    domains: [
      "api.cagir.az",
      "api.cagir.aznull",
      // "api.cagir.azundefined",
      "www.facebook.com",
      "static.getclicky.com",
    ],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cagir.az",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: "server",
  //         analyzerPort: 8888,
  //       })
  //     );
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
