// Learn more https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("md", "mdx");

config.transformer.babelTransformerPath = require.resolve(
  "./metro.transformer.js"
);

// Enable CSS support for web
config.resolver.platforms = ["ios", "android", "native", "web"];

module.exports = config;
