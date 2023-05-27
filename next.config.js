/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/status/:code/(.*)',
        destination: '/src/app/api/status/[code]/route.ts',
      },
      {
        source: '/api/users/(.*)',
        destination: '/src/app/api/users/route.ts',
      },
      // Adicione outras regras de roteamento para suas rotas handlers aqui
    ];
  },
}
module.exports = nextConfig
