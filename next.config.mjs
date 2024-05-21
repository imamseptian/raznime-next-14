/** @type {import('next').NextConfig} */
const nextConfig = {
  images : {
    remotePatterns: [
      {
        hostname: 'gogocdn.net'
      },
      {
        hostname: 'placehold.co'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
