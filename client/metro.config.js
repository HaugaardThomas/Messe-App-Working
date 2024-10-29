// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add asset extensions required for Viro
config.resolver = {
  ...config.resolver,
  assetExts: [
    ...config.resolver.assetExts,
    'obj', 'mtl', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'bin', 'arobject', 'png',
  ],
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    '@reactvision/react-viro': require.resolve('@reactvision/react-viro'),
  },
};

// Maintain default transformer options
config.transformer = {
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

module.exports = config;
