import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
