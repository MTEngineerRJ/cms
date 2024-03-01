/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: {
    BACKEND_DOMAIN: "https://cms-d39w.onrender.com",
    // BACKEND_DOMAIN: "http://localhost:3006",
    CRYPTO_SECRET_KEY: "gjfdkhslbreif847593rewfdkjbcm34woebkdjcnx43oihefdkcnx",
    COOKIE_PASSWORD: "ierfkgj439802vfckdh5438909endck",
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    CLOUDINARY_CLOUD_NAME: "dcrq3m6dx",
    NEXT_PUBLIC_CLOUDINARY_API_KEY: "121866971488326",
    AWS_SECRET_KEY:'pILejJnrftGl79ww68bQYYJnVVUb0JgF+KEblsM+',
    AWS_ACCESS_KEY:'AKIAXYKJS2WVRYETNU4W',
    AWS_REGION:'ap-south-1',
    AWS_BUCKET:'cmsdocv1',
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: "FFNmV8H7NH3euKmH0wf1bFqfZjI",

  }
  ,
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "*.cloudinary.com",
      'cmsdocv1.s3.ap-south-1.amazonaws.com'],

  },
};

module.exports = nextConfig;
