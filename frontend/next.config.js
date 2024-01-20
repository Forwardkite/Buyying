/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");

module.exports = nextConfig;

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
