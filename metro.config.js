const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const nodeLibs = require('node-libs-react-native');

const config = {
  resolver: {
    extraNodeModules: {
      ...nodeLibs,
      buffer: require.resolve('buffer'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
