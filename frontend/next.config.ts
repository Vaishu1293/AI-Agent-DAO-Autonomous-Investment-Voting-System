import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";

// Load .env file from parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    // Add more variables here as needed
  },
};

export default nextConfig;
