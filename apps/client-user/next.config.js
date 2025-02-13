const path = require("path");
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  swcMinify: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../../"),
    isrMemoryCacheSize: 50,
    scrollRestoration: true,
    largePageDataBytes: 256 * 1000,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
