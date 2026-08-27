import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/calculators/watering",
        destination: "/guides/how-often-to-water-raised-beds",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
