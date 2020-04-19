// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { HotModuleReplacementPlugin, } = require('webpack');

const isDevMode = process.env.NODE_ENV !== 'production';

console.log(`Webpack running in ${isDevMode ? 'development' : 'production'} mode.`)

const createModule = (target = "ES5") => ({
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              target,
            }
          }
        }
      ],
    }
  ]
});

/** @type {import("webpack").Configuration} */
const commonConfig = {
  mode: isDevMode ? 'development' : 'production',
  devtool: isDevMode ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
};

/** @type {import("webpack").Configuration} */
const clientConfig = {
  ...commonConfig,
  module: createModule(),
  entry: isDevMode ? ['webpack-hot-middleware/client', './client.ts'] : ['./client.ts'],
  output: {
    path: resolve(__dirname, isDevMode ? 'client' : 'build/client'),
    filename: 'client.js',
  },
  plugins: isDevMode ? [new HotModuleReplacementPlugin()] : [],
};

/** @type {import("webpack").Configuration} */
const serverConfig = {
  ...commonConfig,
  module: createModule("ES2019"),
  entry: isDevMode ? './server.ts' : './productionStart.ts',
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
