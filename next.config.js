/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseurl: "http://localhost:4000/api/v1",
  }
}

module.exports = nextConfig
