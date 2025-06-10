/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // 游戏详情页
      {
        source: '/game/:name',
        destination: '/games/:name',
      },
      // 分类页面
      {
        source: '/category/:id/:page',
        destination: '/category/:id?page=:page',
      },
      {
        source: '/category/:id',
        destination: '/category/:id',
      },
      // 标签页面
      {
        source: '/tag/:url/:page',
        destination: '/tag/:url?page=:page',
      },
      {
        source: '/tag/:url',
        destination: '/tag/:url',
      },
      // 首页分页
      {
        source: '/page/:page',
        destination: '/?page=:page',
      },
      // 静态页面
      {
        source: '/about',
        destination: '/about',
      },
      {
        source: '/faq',
        destination: '/faq',
      },
      {
        source: '/contact',
        destination: '/contact',
      },
      {
        source: '/privacy',
        destination: '/privacy',
      },
      {
        source: '/terms',
        destination: '/terms',
      }
    ];
  },
  trailingSlash: false,
  images: {
    domains: ['www.playbestgames.online'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.gamemonetize.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.playbestgames.online',
        pathname: '/games-image/**',
      },
    ],
  },
}

module.exports = nextConfig 