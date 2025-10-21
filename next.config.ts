/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... autres configurations (expérimentales, etc.)
  
  images: {
    remotePatterns: [
      // 🚨 Nouveau domaine à autoriser (pour les images Medium)
      {
        protocol: 'https',
        hostname: 'miro.medium.com', 
        port: '',
        pathname: '/v2/resize:fit:1400/**', // Autorise le chemin de redimensionnement de Medium
      },
      // Domaine Postman existant
      {
        protocol: 'https',
        hostname: 'blog.postman.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // Domaine YouTube existant
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', 
        port: '',
        pathname: '/vi/**', 
      },
      // ... Ajoutez d'autres domaines ici
    ],
  },
  // ...
};

module.exports = nextConfig;