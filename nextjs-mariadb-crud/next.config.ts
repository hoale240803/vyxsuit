import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1wuhi05elo03b.cloudfront.net',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
