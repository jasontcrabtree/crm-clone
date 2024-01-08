/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['crm-clone.vercel.app/', '*.crm-clone.vercel.app/'],
    },
  },
};
