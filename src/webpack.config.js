// @ts-check
const { resolve } = require('path');
const { HotModuleReplacementPlugin, } = require('webpack');

 const isDevMode = process.env.NODE_ENV !== 'production';

console.log(`Webpack running in ${isDevMode ? 'development' : 'production'} mode.`)

/** @type {import("webpack").Configuration} */
const commonConfig = {
  mode: isDevMode ? 'development' : 'production',
  devtool: isDevMode ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
};

/** @type {import("webpack").Configuration} */
const clientConfig = {
  ...commonConfig,
  entry: isDevMode ? ['webpack-hot-middleware/client', './app/client.ts'] : ['./app/client.ts'],
  output: {
    path: resolve(__dirname, isDevMode ? 'client' : 'build/client'),
    filename: 'client.js',
  },
  plugins: isDevMode ? [new HotModuleReplacementPlugin()] : [],
};

/** @type {import("webpack").Configuration} */
const serverConfig = {
  ...commonConfig,
  entry: isDevMode ? './app/server.ts' : './productionStart.ts',
  output: {
    libraryTarget: 'commonjs',
    path: resolve(__dirname, isDevMode ? 'server' : 'build/server'),
    filename: 'server.js',
  },
  target: "node",
  optimization: {
    minimize: false,
  },
};

module.exports = [clientConfig, serverConfig];
