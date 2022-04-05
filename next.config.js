/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "i.pravatar.cc"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://nextjs-social-media-theta.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
