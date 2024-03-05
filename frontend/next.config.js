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
