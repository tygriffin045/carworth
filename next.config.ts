import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/compare/viofo-vs-n4", destination: "/compare", permanent: true },
      { source: "/compare/mini-vs-a129", destination: "/compare", permanent: true },
    ];
  },
};
export default nextConfig;
