/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ghuellgktqqzpryuyiky.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Diğer mevcut remotePatterns ayarlarınız varsa onları da koruyun
    ],
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
    ];
  },
  // Diğer Next.js yapılandırma seçenekleriniz...
};

export default nextConfig;