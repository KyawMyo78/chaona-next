const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web-specific configuration to include global CSS
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
