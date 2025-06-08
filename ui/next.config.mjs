/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'http://zti-projekt-server:8080/graphql/:path*' // Proxy to Backend
        }
        ]
    },
};

export default nextConfig;
