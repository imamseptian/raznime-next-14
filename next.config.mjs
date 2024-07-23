/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized:
    //   process.env.VERCEL_ENV === "production" &&
    //   process.env.VERCEL_PLAN === "free",
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "gogocdn.net",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
