/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  images: {
		remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
	},
};

export default nextConfig;
