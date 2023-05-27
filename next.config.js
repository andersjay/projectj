/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/status/:code/(.*)',
        destination: '/api/status/[code]/route.ts',
      },
      {
        source: '/api/users/(.*)',
        destination: '/api/users/route.ts',
      },
      // Adicione outras regras de roteamento para suas rotas handlers aqui
    ];
  },
}
module.exports = nextConfig
