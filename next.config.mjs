/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Isso é importante se você estiver usando bibliotecas que utilizam 'fs' ou outros módulos nativos do Node.js
        config.resolve.fallback = {
          fs: false,
          path: false,
          os: false,
          http: false,
          https: false,
          crypto: false,
          stream: false,
          zlib: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  