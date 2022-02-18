const path = require("path");

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

module.exports = nextConfig;
