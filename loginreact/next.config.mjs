/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [new URL(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL).hostname],
  },
};

export default nextConfig;
