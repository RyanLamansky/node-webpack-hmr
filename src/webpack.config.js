const path = require('path');
const webpack = require('webpack');

const commonConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
};

const clientConfig = {
    ...commonConfig,
    entry: ['webpack-hot-middleware/client', './app/client.tsx'],
    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'client.js',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

const serverConfig = {
    ...commonConfig,
    entry: './app/server.tsx',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'server'),
        filename: 'server.js',
    },
};

module.exports = [clientConfig, serverConfig];
