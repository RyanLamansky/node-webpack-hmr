// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const { HotModuleReplacementPlugin, DefinePlugin, } = require("webpack");

const isDevMode = process.env.NODE_ENV !== "production";

console.log(`Webpack running in ${isDevMode ? "development" : "production"} mode.`);

const createModule = (target = "ES5") => ({
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
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
  mode: isDevMode ? "development" : "production",
  devtool: isDevMode ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
};

const createClientConfig = (name, target = "ES5") => {
  /** @type {import("webpack").Configuration} */
  const clientConfig = {
    ...commonConfig,
    module: createModule(target),
    entry: isDevMode ? ["webpack-hot-middleware/client", "./entry/client.ts"] : ["./entry/client.ts"],
    output: {
      path: resolve(__dirname, isDevMode ? "client" : "build/client"),
      filename: `${name}.js`,
    },
    plugins: isDevMode ? [new HotModuleReplacementPlugin()] : [],
  };
  return clientConfig;
};

/** @type {import("webpack").Configuration} */
const serverConfig = {
  ...commonConfig,
  module: createModule("ES2019"),
  entry: isDevMode ? "./entry/server.ts" : "./productionStart.ts",
  output: {
    libraryTarget: "commonjs",
    path: resolve(__dirname, isDevMode ? "server" : "build/server"),
    filename: "server.js",
  },
  target: "node",
  optimization: {
    minimize: false,
  },
  plugins: [new DefinePlugin({BUILD_DATE: `${new Number(new Date())}`})]
};

module.exports = [createClientConfig("modern", "ES2019"), createClientConfig("legacy", "ES5"), serverConfig];
