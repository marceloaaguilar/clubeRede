/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { missingSuspenseWithCSRBailout: false },
    output: 'export',
    reactStrictMode: false
};

export default nextConfig;
