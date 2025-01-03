/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL)
          .hostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
